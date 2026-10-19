const fs = require('fs');
let content = fs.readFileSync('./app/globals.css', 'utf-8');

const target = `.faq-cover-section {
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 100svh;
  margin: 0;
  background: #fbfbfe;
  border-radius: 0;
  box-shadow: 0 -18px 48px rgba(18, 16, 57, 0.07);
}`;

const replacement = `.faq-cover-section {
  position: relative;
  z-index: 2;
  width: 100%;
  min-height: 100svh;
  margin: 0;
  background: #fbfbfe;
  border-radius: 40px 40px 0 0;
  box-shadow: 0 -12px 36px rgba(13, 12, 50, 0.06);
  overflow: clip;
}

@media (max-width: 600px) {
  .faq-cover-section {
    border-radius: 26px 26px 0 0;
  }
}`;

// Normalize line endings for replacement
const normalizedContent = content.replace(/\r\n/g, '\n');
const normalizedTarget = target.replace(/\r\n/g, '\n');

if (normalizedContent.includes(normalizedTarget)) {
  const newContent = normalizedContent.replace(normalizedTarget, replacement);
  fs.writeFileSync('./app/globals.css', newContent);
  console.log('CSS updated successfully!');
} else {
  console.log('Target not found! Target:', normalizedTarget);
}
