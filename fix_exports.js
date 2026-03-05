const fs = require('fs');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        file = dir + '/' + file;
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            results = results.concat(walk(file));
        } else {
            if (file.endsWith('route.ts') || file.endsWith('page.tsx')) {
                results.push(file);
            }
        }
    });
    return results;
}

const files = walk('./src/app');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');

    // Check if the file starts with the export dynamic line
    if (content.startsWith("export const dynamic = 'force-dynamic';")) {
        const lines = content.split('\n');

        let foundImports = false;
        let lastImportIndex = -1;

        for (let i = 1; i < lines.length; i++) {
            if (lines[i].trim().startsWith('import ')) {
                foundImports = true;
                lastImportIndex = i;
            }
        }

        if (foundImports && lastImportIndex !== -1) {
            lines.shift(); // remove from line 0
            lines.splice(lastImportIndex, 0, "\nexport const dynamic = 'force-dynamic';"); // insert after last block
            fs.writeFileSync(file, lines.join('\n'));
            console.log("Fixed export position for", file);
        }
    }
});
