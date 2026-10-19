"use client";

import * as React from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Html, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

export type BuildingMarker = {
  id: string;
  position: [number, number, number];
  icon?: React.ReactNode;
  label: string;
  description: string;
  accent?: string;
};

export type Building3DConfig = {
  buildingColor?: string;
  glassColor?: string;
  accentColor?: string;
  windowLightColor?: string;
  baseColor?: string;
  autoRotateSpeed?: number;
  windowAnimation?: boolean;
};

type Building3DProps = {
  markers: BuildingMarker[];
  config?: Building3DConfig;
  className?: string;
  activeMarkerId?: string;
  onMarkerClick?: (marker: BuildingMarker) => void;
  onMarkerHover?: (marker: BuildingMarker | null) => void;
};

const DEFAULT_CONFIG: Required<Building3DConfig> = {
  buildingColor: "#ffffff",
  glassColor: "#7c6fe8",
  accentColor: "#6d4df5",
  windowLightColor: "#e4dcff",
  baseColor: "#d5cef8",
  autoRotateSpeed: 0.32,
  windowAnimation: true,
};

function useReducedMotion() {
  const [reduced, setReduced] = React.useState(false);

  React.useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

// Ease out elastic / smooth spring formula
function easeOutBack(x: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
}

function easeOutCubic(x: number): number {
  return 1 - Math.pow(1 - x, 3);
}

// Global wave controller context for synchronized sweep
interface WaveContextType {
  waveX: number;
  sweepProgress: number;
  isFormed: boolean;
  reducedMotion: boolean;
}

const WaveContext = React.createContext<WaveContextType>({
  waveX: 15,
  sweepProgress: 1,
  isFormed: true,
  reducedMotion: false,
});

// Calculate view-space horizontal X position for any 3D coordinate
function useViewSpaceX(worldPos: [number, number, number]) {
  const { camera } = useThree();
  const tempVec = React.useMemo(() => new THREE.Vector3(), []);
  
  return React.useCallback(() => {
    tempVec.set(worldPos[0], worldPos[1], worldPos[2]);
    tempVec.applyMatrix4(camera.matrixWorldInverse);
    return tempVec.x;
  }, [camera, tempVec, worldPos]);
}

type WindowPaneProps = {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number, number];
  glassColor: string;
  lightColor: string;
  animated: boolean;
  phase: number;
};

function WindowPane({
  position,
  rotation = [0, 0, 0],
  size,
  glassColor,
  lightColor,
  animated,
  phase,
}: WindowPaneProps) {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const materialRef = React.useRef<THREE.MeshPhysicalMaterial>(null);
  const { waveX, isFormed, reducedMotion } = React.useContext(WaveContext);
  const getViewX = useViewSpaceX(position);

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current) return;

    if (reducedMotion || isFormed) {
      meshRef.current.scale.set(1, 1, 1);
      meshRef.current.position.set(position[0], position[1], position[2]);
      if (!animated) {
        materialRef.current.emissiveIntensity = 0.35;
      } else {
        const wave = Math.sin(clock.elapsedTime * 0.72 + phase);
        const pulse = THREE.MathUtils.smoothstep(wave, -0.55, 0.9);
        materialRef.current.emissiveIntensity = 0.2 + pulse * 0.65;
      }
      return;
    }

    const vx = getViewX();
    const delta = waveX - vx;

    if (delta < -0.4) {
      // Before wave: hidden
      meshRef.current.scale.set(0, 0, 0);
      materialRef.current.emissiveIntensity = 0;
    } else if (delta < 1.4) {
      // During wave: spring reveal + luminous flash
      const p = THREE.MathUtils.clamp((delta + 0.4) / 1.8, 0, 1);
      const s = easeOutBack(p);
      meshRef.current.scale.set(s, s, s);

      // Flash at the crest
      const flash = Math.max(0, 1 - p) * 2.2;
      materialRef.current.emissiveIntensity = 0.2 + flash;
    } else {
      // Formed
      meshRef.current.scale.set(1, 1, 1);
      if (!animated) {
        materialRef.current.emissiveIntensity = 0.35;
      } else {
        const wave = Math.sin(clock.elapsedTime * 0.72 + phase);
        const pulse = THREE.MathUtils.smoothstep(wave, -0.55, 0.9);
        materialRef.current.emissiveIntensity = 0.2 + pulse * 0.65;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position} rotation={rotation} castShadow>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        ref={materialRef}
        color={glassColor}
        emissive={lightColor}
        emissiveIntensity={0.25}
        transmission={0.45}
        roughness={0.15}
        metalness={0.12}
        clearcoat={1.0}
        clearcoatRoughness={0.1}
      />
    </mesh>
  );
}

type AssembledBlockProps = {
  args: [number, number, number];
  radius: number;
  smoothness: number;
  position: [number, number, number];
  color: string;
  roughness?: number;
  metalness?: number;
  transmission?: number;
  clearcoat?: number;
  emissive?: string;
  emissiveIntensity?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  dissolveOffset?: [number, number, number];
};

function AssembledBlock({
  args,
  radius,
  smoothness,
  position,
  color,
  roughness = 0.2,
  metalness = 0.08,
  transmission = 0.55,
  clearcoat = 0.9,
  emissive = "#000000",
  emissiveIntensity = 0,
  castShadow = true,
  receiveShadow = true,
  dissolveOffset = [-1.2, 0.6, 0.8],
}: AssembledBlockProps) {
  const groupRef = React.useRef<THREE.Group>(null);
  const materialRef = React.useRef<THREE.MeshPhysicalMaterial>(null);
  const { waveX, isFormed, reducedMotion } = React.useContext(WaveContext);
  const getViewX = useViewSpaceX(position);

  useFrame(() => {
    if (!groupRef.current || !materialRef.current) return;

    if (reducedMotion || isFormed) {
      groupRef.current.position.set(position[0], position[1], position[2]);
      groupRef.current.scale.set(1, 1, 1);
      groupRef.current.rotation.set(0, 0, 0);
      materialRef.current.emissiveIntensity = emissiveIntensity;
      return;
    }

    const vx = getViewX();
    const delta = waveX - vx;

    if (delta < -0.6) {
      // Pre-wave: invisible / dispersed
      groupRef.current.scale.set(0, 0, 0);
      groupRef.current.position.set(
        position[0] + dissolveOffset[0],
        position[1] + dissolveOffset[1],
        position[2] + dissolveOffset[2],
      );
      materialRef.current.emissiveIntensity = 0;
    } else if (delta < 1.6) {
      // Wave hitting: dynamic materialization & elastic assembly
      const p = THREE.MathUtils.clamp((delta + 0.6) / 2.2, 0, 1);
      const easedScale = easeOutBack(p);
      const easedPos = easeOutCubic(p);

      groupRef.current.scale.set(easedScale, easedScale, easedScale);
      groupRef.current.position.set(
        THREE.MathUtils.lerp(position[0] + dissolveOffset[0], position[0], easedPos),
        THREE.MathUtils.lerp(position[1] + dissolveOffset[1], position[1], easedPos),
        THREE.MathUtils.lerp(position[2] + dissolveOffset[2], position[2], easedPos),
      );

      // Crystalline wave crest flash
      const crestFlash = Math.sin(p * Math.PI) * 1.8;
      materialRef.current.emissiveIntensity = emissiveIntensity + crestFlash;
    } else {
      // Assembled
      groupRef.current.position.set(position[0], position[1], position[2]);
      groupRef.current.scale.set(1, 1, 1);
      groupRef.current.rotation.set(0, 0, 0);
      materialRef.current.emissiveIntensity = THREE.MathUtils.damp(
        materialRef.current.emissiveIntensity,
        emissiveIntensity,
        4,
        0.016,
      );
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <RoundedBox
        args={args}
        radius={radius}
        smoothness={smoothness}
        castShadow={castShadow}
        receiveShadow={receiveShadow}
      >
        <meshPhysicalMaterial
          ref={materialRef}
          color={color}
          roughness={roughness}
          metalness={metalness}
          transmission={transmission}
          thickness={1.1}
          ior={1.52}
          clearcoat={clearcoat}
          clearcoatRoughness={0.12}
          emissive={emissive}
          emissiveIntensity={emissiveIntensity}
          transparent
        />
      </RoundedBox>
    </group>
  );
}

type MarkerNodeProps = {
  marker: BuildingMarker;
  active: boolean;
  accentColor: string;
  onClick: (marker: BuildingMarker) => void;
  onHover: (marker: BuildingMarker | null) => void;
};

function MarkerNode({
  marker,
  active,
  accentColor,
  onClick,
  onHover,
}: MarkerNodeProps) {
  const accent = marker.accent ?? accentColor;
  const { waveX, isFormed, reducedMotion } = React.useContext(WaveContext);
  const getViewX = useViewSpaceX(marker.position);
  const [visible, setVisible] = React.useState(reducedMotion || isFormed);

  useFrame(() => {
    if (reducedMotion || isFormed) {
      if (!visible) setVisible(true);
      return;
    }
    const vx = getViewX();
    const shouldShow = waveX >= vx - 0.2;
    if (shouldShow !== visible) {
      setVisible(shouldShow);
    }
  });

  return (
    <Html
      position={marker.position}
      center
      distanceFactor={8}
      zIndexRange={[30, 0]}
    >
      <div
        className={`group relative flex items-center justify-center transition-all duration-700 ${
          visible
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-0 opacity-0"
        }`}
        onMouseEnter={() => onHover(marker)}
        onMouseLeave={() => onHover(null)}
      >
        <span
          aria-hidden="true"
          className="absolute h-12 w-12 rounded-full opacity-25 motion-safe:animate-ping"
          style={{ backgroundColor: accent }}
        />
        <button
          type="button"
          aria-label={`${marker.label}: ${marker.description}`}
          aria-pressed={active}
          className="relative grid h-10 w-10 place-items-center rounded-full border border-white/90 bg-white/95 text-sm font-[600] shadow-[0_10px_30px_rgba(68,45,150,0.28)] backdrop-blur transition duration-300 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-violet-300/70"
          style={{ color: accent }}
          onClick={(event) => {
            event.stopPropagation();
            onClick(marker);
          }}
        >
          {marker.icon ?? "•"}
        </button>

        <div
          className={`pointer-events-none absolute left-1/2 top-12 w-48 -translate-x-1/2 rounded-2xl border border-white/80 bg-white/95 p-3 text-left shadow-xl backdrop-blur-md transition duration-200 ${
            active
              ? "translate-y-0 opacity-100"
              : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
          }`}
        >
          <p className="text-xs font-semibold text-slate-900">{marker.label}</p>
          <p className="mt-1 text-[11px] leading-4 text-slate-500">
            {marker.description}
          </p>
        </div>
      </div>
    </Html>
  );
}

// Visual sweep wave curtain and crystalline particle beam that travels across the screen
function WavefrontSweep() {
  const meshRef = React.useRef<THREE.Mesh>(null);
  const particlesRef = React.useRef<THREE.Points>(null);
  const { waveX, sweepProgress, isFormed, reducedMotion } =
    React.useContext(WaveContext);
  const { camera } = useThree();

  // Generate crystal spark particles along the wave line
  const [particlePositions] = React.useState(() => {
    const count = 90;
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 1.6; // localized around wave X
      pos[i * 3 + 1] = (Math.random() - 0.5) * 7.5; // height distribution
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5.5; // depth
    }
    return pos;
  });

  useFrame(({ clock }) => {
    if (reducedMotion || isFormed) {
      if (meshRef.current) meshRef.current.visible = false;
      if (particlesRef.current) particlesRef.current.visible = false;
      return;
    }

    // Convert view-space waveX to world position aligned with camera
    const tempVec = new THREE.Vector3(waveX, 0, -8);
    tempVec.applyMatrix4(camera.matrixWorld);

    if (meshRef.current) {
      meshRef.current.visible = true;
      meshRef.current.position.copy(tempVec);
      meshRef.current.quaternion.copy(camera.quaternion);

      const mat = meshRef.current.material as THREE.MeshBasicMaterial;
      const opacity = Math.sin(sweepProgress * Math.PI) * 0.45;
      mat.opacity = opacity;
    }

    if (particlesRef.current) {
      particlesRef.current.visible = true;
      particlesRef.current.position.copy(tempVec);
      particlesRef.current.quaternion.copy(camera.quaternion);

      const pMat = particlesRef.current.material as THREE.PointsMaterial;
      pMat.opacity = Math.sin(sweepProgress * Math.PI) * 0.85;

      // Subtle particle shimmer
      particlesRef.current.rotation.z = clock.elapsedTime * 0.5;
    }
  });

  return (
    <group>
      {/* Luminous energy wave curtain */}
      <mesh ref={meshRef}>
        <planeGeometry args={[1.8, 12]} />
        <meshBasicMaterial
          color="#9275ff"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Sparkling crystal particles */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color="#c8baff"
          transparent
          opacity={0.7}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

type ProceduralBuildingProps = {
  markers: BuildingMarker[];
  config: Required<Building3DConfig>;
  activeMarkerId?: string;
  onMarkerClick: (marker: BuildingMarker) => void;
  onMarkerHover: (marker: BuildingMarker | null) => void;
};

function ProceduralBuilding({
  markers,
  config,
  activeMarkerId,
  onMarkerClick,
  onMarkerHover,
}: ProceduralBuildingProps) {
  const buildingRef = React.useRef<THREE.Group>(null);
  const spireRef = React.useRef<THREE.Group>(null);
  const { reducedMotion, isFormed, waveX } = React.useContext(WaveContext);
  const getSpireViewX = useViewSpaceX([0, 3.0, 0]);

  const floors = 10;
  const frontWindowX = [-1.32, -0.66, 0, 0.66, 1.32];
  const sideWindowZ = [-0.72, 0, 0.72];

  useFrame(({ clock }, delta) => {
    if (!buildingRef.current || reducedMotion) return;

    // Smooth subtle idle rotation once formed
    const targetRotation =
      -0.24 + Math.sin(clock.elapsedTime * config.autoRotateSpeed) * 0.16;
    buildingRef.current.rotation.y = THREE.MathUtils.damp(
      buildingRef.current.rotation.y,
      targetRotation,
      2.5,
      delta,
    );

    // Spire wave assembly
    if (spireRef.current) {
      if (reducedMotion || isFormed) {
        spireRef.current.scale.set(1, 1, 1);
      } else {
        const svx = getSpireViewX();
        const deltaSpire = waveX - svx;
        if (deltaSpire < -0.3) {
          spireRef.current.scale.set(0, 0, 0);
        } else if (deltaSpire < 1.3) {
          const p = THREE.MathUtils.clamp((deltaSpire + 0.3) / 1.6, 0, 1);
          const s = easeOutBack(p);
          spireRef.current.scale.set(s, s, s);
        } else {
          spireRef.current.scale.set(1, 1, 1);
        }
      }
    }
  });

  return (
    <Float
      speed={reducedMotion ? 0 : 1.1}
      rotationIntensity={reducedMotion ? 0 : 0.04}
      floatIntensity={reducedMotion ? 0 : 0.2}
    >
      <group
        ref={buildingRef}
        rotation={[0, -0.24, 0]}
        position={[0, -0.25, 0]}
      >
        {/* Foundation plinth 1 */}
        <AssembledBlock
          args={[5.35, 0.34, 4.05]}
          radius={0.16}
          smoothness={6}
          position={[0, -2.72, 0]}
          color={config.baseColor}
          roughness={0.65}
          metalness={0.15}
          transmission={0.15}
          dissolveOffset={[-2.2, -0.6, 0.5]}
        />

        {/* Foundation plinth 2 */}
        <AssembledBlock
          args={[4.55, 0.28, 3.3]}
          radius={0.12}
          smoothness={6}
          position={[0, -2.46, 0]}
          color="#ffffff"
          roughness={0.4}
          metalness={0.12}
          transmission={0.3}
          dissolveOffset={[-1.8, -0.4, 0.6]}
        />

        {/* 10 Architectural Glass Floors */}
        {Array.from({ length: floors }).map((_, floorIndex) => {
          const y = -2.1 + floorIndex * 0.5;
          const xOffset = (floorIndex % 2 === 0 ? -1 : 1) * 0.8;

          return (
            <React.Fragment key={`floor-${floorIndex}`}>
              {/* Floor glass body */}
              <AssembledBlock
                args={[3.85, 0.46, 2.5]}
                radius={0.06}
                smoothness={5}
                position={[0, y, 0]}
                color={config.buildingColor}
                roughness={0.18}
                metalness={0.08}
                transmission={0.62}
                clearcoat={1.0}
                emissive={config.accentColor}
                emissiveIntensity={0.04}
                dissolveOffset={[xOffset, 0.4, 0.7]}
              />

              {/* Front & Back Windows */}
              {frontWindowX.map((x, windowIndex) => (
                <React.Fragment key={`front-${floorIndex}-${windowIndex}`}>
                  <WindowPane
                    position={[x, y, 1.266]}
                    size={[0.43, 0.25, 0.035]}
                    glassColor={config.glassColor}
                    lightColor={config.windowLightColor}
                    animated={config.windowAnimation && !reducedMotion}
                    phase={floorIndex * 0.83 + windowIndex * 1.37}
                  />
                  <WindowPane
                    position={[-x, y, -1.266]}
                    rotation={[0, Math.PI, 0]}
                    size={[0.43, 0.25, 0.035]}
                    glassColor={config.glassColor}
                    lightColor={config.windowLightColor}
                    animated={config.windowAnimation && !reducedMotion}
                    phase={floorIndex * 1.08 + windowIndex * 0.91 + 2.4}
                  />
                </React.Fragment>
              ))}

              {/* Side Windows */}
              {sideWindowZ.map((z, windowIndex) => (
                <React.Fragment key={`side-${floorIndex}-${windowIndex}`}>
                  <WindowPane
                    position={[1.941, y, z]}
                    rotation={[0, Math.PI / 2, 0]}
                    size={[0.43, 0.25, 0.035]}
                    glassColor={config.glassColor}
                    lightColor={config.windowLightColor}
                    animated={config.windowAnimation && !reducedMotion}
                    phase={floorIndex * 0.74 + windowIndex * 1.65 + 1.2}
                  />
                  <WindowPane
                    position={[-1.941, y, -z]}
                    rotation={[0, -Math.PI / 2, 0]}
                    size={[0.43, 0.25, 0.035]}
                    glassColor={config.glassColor}
                    lightColor={config.windowLightColor}
                    animated={config.windowAnimation && !reducedMotion}
                    phase={floorIndex * 1.15 + windowIndex * 1.21 + 3.6}
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          );
        })}

        {/* Roof Crown */}
        <AssembledBlock
          args={[4.05, 0.16, 2.72]}
          radius={0.05}
          smoothness={5}
          position={[0, 2.48, 0]}
          color="#ffffff"
          roughness={0.25}
          transmission={0.45}
          dissolveOffset={[0.8, 0.9, 0.5]}
        />

        {/* Entrance Portal */}
        <AssembledBlock
          args={[1.02, 0.72, 0.18]}
          radius={0.05}
          smoothness={5}
          position={[0, -2.15, 1.39]}
          color={config.glassColor}
          roughness={0.15}
          metalness={0.2}
          transmission={0.5}
          emissive={config.accentColor}
          emissiveIntensity={0.2}
          dissolveOffset={[-0.9, -0.3, 1.1]}
        />

        {/* Crystalline Spire & Crown Beacon */}
        <group ref={spireRef}>
          <mesh position={[0, 2.75, 0]} castShadow>
            <boxGeometry args={[0.12, 0.54, 0.12]} />
            <meshPhysicalMaterial
              color={config.accentColor}
              roughness={0.2}
              metalness={0.3}
              clearcoat={1.0}
            />
          </mesh>
          <mesh position={[0, 3.05, 0]}>
            <sphereGeometry args={[0.14, 28, 28]} />
            <meshPhysicalMaterial
              color="#ffffff"
              emissive={config.accentColor}
              emissiveIntensity={2.0}
              roughness={0.1}
              metalness={0.1}
              clearcoat={1.0}
            />
          </mesh>
        </group>

        {/* Interactive Marker Pins */}
        {markers.map((marker) => (
          <MarkerNode
            key={marker.id}
            marker={marker}
            active={marker.id === activeMarkerId}
            accentColor={config.accentColor}
            onClick={onMarkerClick}
            onHover={onMarkerHover}
          />
        ))}
      </group>
    </Float>
  );
}

function SceneController({
  markers,
  config,
  activeMarkerId,
  onMarkerClick,
  onMarkerHover,
}: ProceduralBuildingProps) {
  return (
    <>
      <ambientLight intensity={1.8} />
      <hemisphereLight args={["#f0ecff", "#cbc3ed", 1.2]} />
      <directionalLight
        castShadow
        color="#ffffff"
        intensity={3.4}
        position={[6, 9, 7]}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight
        color={config.accentColor}
        intensity={1.4}
        position={[-6, 3, 5]}
      />

      <WavefrontSweep />

      <ProceduralBuilding
        markers={markers}
        config={config}
        activeMarkerId={activeMarkerId}
        onMarkerClick={onMarkerClick}
        onMarkerHover={onMarkerHover}
      />

      <ContactShadows
        position={[0, -3.05, 0]}
        opacity={0.32}
        scale={9.5}
        blur={2.8}
        far={5.5}
        color="#5f4ea2"
      />
    </>
  );
}

export function Building3D({
  markers,
  config,
  className,
  activeMarkerId,
  onMarkerClick,
  onMarkerHover,
}: Building3DProps) {
  const mergedConfig = React.useMemo(
    () => ({ ...DEFAULT_CONFIG, ...config }),
    [config],
  );
  const reducedMotion = useReducedMotion();

  // Wave formation timeline state
  // Starts far on the left edge (X ≈ -10) and sweeps across to the right (X ≈ +10)
  const [waveState, setWaveState] = React.useState<{
    waveX: number;
    sweepProgress: number;
    isFormed: boolean;
  }>({
    waveX: reducedMotion ? 15 : -10,
    sweepProgress: reducedMotion ? 1 : 0,
    isFormed: reducedMotion,
  });

  const startTimeRef = React.useRef<number | null>(null);
  const duration = 2800; // 2.8s sweep across screen

  React.useEffect(() => {
    if (reducedMotion) {
      setWaveState({
        waveX: 15,
        sweepProgress: 1,
        isFormed: true,
      });
      return;
    }

    let animationFrameId: number;

    const animate = (time: number) => {
      if (startTimeRef.current === null) {
        startTimeRef.current = time;
      }

      const elapsed = time - startTimeRef.current;
      const rawProgress = THREE.MathUtils.clamp(elapsed / duration, 0, 1);
      const easedProgress = easeOutCubic(rawProgress);

      // Map from far left of screen (-9.5) to far right (+9.5)
      const currentWaveX = THREE.MathUtils.lerp(-9.5, 9.5, easedProgress);
      const formed = rawProgress >= 1;

      setWaveState({
        waveX: currentWaveX,
        sweepProgress: rawProgress,
        isFormed: formed,
      });

      if (!formed) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [reducedMotion]);

  const waveContextValue = React.useMemo<WaveContextType>(
    () => ({
      waveX: waveState.waveX,
      sweepProgress: waveState.sweepProgress,
      isFormed: waveState.isFormed,
      reducedMotion,
    }),
    [waveState.waveX, waveState.sweepProgress, waveState.isFormed, reducedMotion],
  );

  const handleMarkerClick = React.useCallback(
    (marker: BuildingMarker) => onMarkerClick?.(marker),
    [onMarkerClick],
  );

  const handleMarkerHover = React.useCallback(
    (marker: BuildingMarker | null) => onMarkerHover?.(marker),
    [onMarkerHover],
  );

  return (
    <WaveContext.Provider value={waveContextValue}>
      <div
        className={`relative h-[480px] w-full overflow-visible sm:h-[560px] ${className ?? ""}`}
        aria-label="Wisbu özelliklerini gösteren etkileşimli üç boyutlu kristal bina"
      >
        <Canvas
          dpr={[1, 1.6]}
          shadows
          camera={{
            position: [7.4, 4.7, 8.6],
            fov: 34,
            near: 0.1,
            far: 100,
          }}
          gl={{
            alpha: true,
            antialias: true,
            powerPreference: "high-performance",
          }}
          onPointerMissed={() => handleMarkerHover(null)}
        >
          <SceneController
            markers={markers}
            config={mergedConfig}
            activeMarkerId={activeMarkerId}
            onMarkerClick={handleMarkerClick}
            onMarkerHover={handleMarkerHover}
          />
        </Canvas>

        {/* Ambient bottom glow matching the crystal theme */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[15%] bottom-[5%] h-20 rounded-full bg-violet-500/15 blur-3xl transition-opacity duration-1000"
          style={{ opacity: waveState.sweepProgress }}
        />
      </div>
    </WaveContext.Provider>
  );
}
