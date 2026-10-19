const fs = require('fs');
const file = 'components/LegacyFeaturesGrid.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace className="layer-move"
content = content.replace(/ className="layer-move"/g, '');
// Replace className="layer-move-bg" 
content = content.replace(/ className="layer-move-bg"/g, '');
// Replace className="success-glow"
content = content.replace(/ className="success-glow"/g, '');
// Also replace when they are first in className
content = content.replace(/layer-move-bg /g, '');
content = content.replace(/layer-move /g, '');
content = content.replace(/success-glow /g, '');
// And when they are at the end
content = content.replace(/ layer-move-bg/g, '');
content = content.replace(/ layer-move/g, '');
content = content.replace(/ success-glow/g, '');

fs.writeFileSync(file, content);
console.log("Done");
