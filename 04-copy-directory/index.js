console.log('# --------------- Copy task START --------------- #');

const fs = require('fs');
const path = require('path');

const folderName = 'files'
const destName = `${folderName}-copy`
const src = path.join(__dirname, folderName)
const dest = path.join(__dirname, destName)
copyDir(src, dest)

async function copyDir(src, dest) {
    try {
        console.log('# ------ Copy folder to destination:', dest);
        await onFolderExists(dest);
        // await fs.promises.mkdir(dest, { recursive: false});
        await fs.promises.mkdir(dest, { recursive: true });
        await copyFilesInDir(src, dest);
    } catch (error) {
        console.log('---CopyDir error:', error)
    }
}

async function copyFilesInDir(dirName, dest) {
    try {
        const files = await fs.promises.readdir(dirName, { withFileTypes: true });
        for (let file of files) {
            if (file.isFile()) {
                await fs.promises.copyFile(path.join(dirName, file.name), path.join(dest, file.name));
            }
            else if (file.isDirectory) {
                // void 0;
                await copyDir(path.join(dirName, file.name), path.join(dest, file.name));
            }
        }
    } catch (err) {
        console.error('copyFile error:', err);
    }
} // copyFilesInDir(dirName);

async function onFolderExists(dirName) { 
    try {
        await fs.promises.access(dirName, fs.constants.F_OK);
        console.log(`# --- Folder exists, removing:\n${dirName}`);
        await fs.promises.rm(dirName, { recursive: true, force: true });
        console.log(`# --- Folder removing DONE!`);
        // The check OK, folder exists
    } catch (error) {
        console.log(`# --- Folder ${dirName} DOES NOT exists`);
        // The check is notOK, folder does not exists
    }
}
