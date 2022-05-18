const path = require('path');
const fs = require('fs');
const folderName = 'secret-folder';

const dirName = path.join(__dirname, folderName);

async function readFilesInDir(dirName) {
    try {
        const files = await fs.promises.readdir(dirName, { withFileTypes: true });
        for (let file of files) {
            const fileSize = await fs.promises.stat(path.join(dirName, file.name));
            if (file.isFile()) {
                console.log(`${file.name} - ${path.extname(file.name).slice(1)} - ${fileSize.size} bytes `);
            }
        }
    } catch (err) {
        console.error(err);
    }
} // readFilesInDir(dirName);

readFilesInDir(dirName);