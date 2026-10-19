const fs = require('fs');
let content = fs.readFileSync('./app/globals.css', 'utf-8');

content = content.replace(/\.product-flow-visual--dashboard\s*\{[\s\S]*?\}/, `.product-flow-visual--collection {
  max-width: 920px;
  justify-self: stretch;
}`);

const startMarker = '/* --- Browser Frame --- */';
const endMarker = '/* --- Phone Frame --- */';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
  const replacement = `/* --- Collection Cards --- */
.collection-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid rgba(139, 117, 255, 0.12);
  box-shadow:
    0 24px 60px rgba(45, 32, 101, 0.08),
    0 0 40px rgba(139, 117, 255, 0.05);
  background: transparent;
}

.collection-card img {
  width: 100%;
  height: auto;
  display: block;
}

`;
  
  content = content.substring(0, startIndex) + replacement + content.substring(endIndex);
}

fs.writeFileSync('./app/globals.css', content);
console.log('CSS updated successfully!');
