const fs = require('fs');
const path = require('path');

const walkSync = function (dir, filelist) {
    const files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function (file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist);
        }
        else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                filelist.push(path.join(dir, file));
            }
        }
    });
    return filelist;
};

const files = walkSync('./src');

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('new PrismaClient()') && !file.includes('lib\\\\prisma.ts') && !file.includes('lib/prisma.ts')) {
        content = content.replace(/const prisma = new PrismaClient\(\);/g, 'import prisma from "@/lib/prisma";');
        content = content.replace(/import\s+{\s*PrismaClient\s*}\s+from\s+["']@prisma\/client["'];\r?\n?/g, '');
        content = content.replace(/PrismaClient\s*,\s*/g, '');
        content = content.replace(/,\s*PrismaClient/g, '');
        content = content.replace(/import\s+{\s*}\s+from\s+["']@prisma\/client["'];\r?\n?/g, '');

        fs.writeFileSync(file, content, 'utf8');
        console.log(`Updated ${file}`);
    }
});
