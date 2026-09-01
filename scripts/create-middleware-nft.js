const fs = require('fs');
const path = require('path');

const serverDir = path.join('.next/server');
const middlewareJsPath = path.join(serverDir, 'middleware.js');
const middlewareNftPath = path.join(serverDir, 'middleware.js.nft.json');

if (!fs.existsSync(serverDir)) {
  fs.mkdirSync(serverDir, { recursive: true });
}

// middleware.js 파일 생성 (빌드되지 않은 경우)
if (!fs.existsSync(middlewareJsPath)) {
  const middlewareContent = `const { createMiddleware } = require('next-intl/edge');
const config = require('./middleware-manifest.json');

module.exports = createMiddleware(config);
`;
  fs.writeFileSync(middlewareJsPath, middlewareContent);
  console.log(`✓ Created middleware.js`);
}

// NFT 파일 생성
const nftContent = {
  version: 1,
  files: [
    'middleware.js',
  ],
};

fs.writeFileSync(middlewareNftPath, JSON.stringify(nftContent, null, 2));
console.log(`✓ Created middleware.js.nft.json`);
