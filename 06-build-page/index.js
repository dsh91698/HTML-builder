console.log('# ---------------06 task start ------------------ #');


const fs = require('fs');
const path = require('path');

const prjFolderName = 'project-dist'
// const distFolderPath = path.join(__dirname, './', prjFolderName)
const distFolderPath = path.join(__dirname, prjFolderName)
const htmlFilePath = path.join(distFolderPath, 'index.html')
const cssFilePath = path.join(distFolderPath, 'style.css')
const assetsPath = path.join(distFolderPath, 'assets')
const assertsSrc = path.join(__dirname, 'assets');

// ---- create dist folder - START ----- //
createDistFolder(distFolderPath, assetsPath)

async function createDistFolder(distPath, assetsPath) {
    try {
        await fs.promises.mkdir(distPath, { recursive: true }); // create dist folder
        console.log('dist folder created');
        await fs.promises.mkdir(assetsPath, { recursive: true }); // create assets folder - empty
    } catch (err) {
        console.log('folder already exists', err)
    }
}
// -------- create dist folder - FINISH ----- //

// ------ copy assets folder to dist folder - START ----- //
copyDir(assertsSrc, assetsPath)
// ------ copy assets folder to dist folder - FINISH ----- //

async function copyDir(src, dest) {
    try {
        console.log('# ------ Copy folder to destination:\n', dest);
        await onFolderExists(dest);
        await fs.promises.mkdir(dest, { recursive: true });
        await copyFilesInDir(src, dest);
    } catch (error) {
        console.log('---CopyDir error:\n', error)
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

