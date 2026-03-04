const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else if (file.endsWith('route.ts')) {
            results.push(file);
        }
    });
    return results;
}

const files = walk(path.join(__dirname, 'src/app/api'));

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (!content.includes('force-dynamic')) {
        content = "export const dynamic = 'force-dynamic';\n" + content;
        fs.writeFileSync(file, content);
        console.log('Updated', file);
    }
});

console.log('All API routes explicitly set to force-dynamic to prevent Vercel build errors.');
