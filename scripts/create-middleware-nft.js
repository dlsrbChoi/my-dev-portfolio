const fs = require('fs');
const path = require('path');

const middlewareNftPath = path.join('.next/server', 'middleware.js.nft.json');
const middlewareDir = path.dirname(middlewareNftPath);

if (!fs.existsSync(middlewareDir)) {
  fs.mkdirSync(middlewareDir, { recursive: true });
}

const nftContent = {
  version: 1,
  files: [
    'middleware.js',
    '../server/middleware.js',
  ],
};

fs.writeFileSync(middlewareNftPath, JSON.stringify(nftContent, null, 2));
console.log(`✓ Created middleware.js.nft.json`);
