const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf8');
code = code.replace(/\) {16}<div className="grid grid-cols-1 md:grid-cols-2 gap-6">/, ')}\n                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">');
code = code.replace(/\)}div>/, ')}');
fs.writeFileSync('src/App.tsx', code);
console.log('Fixed');
