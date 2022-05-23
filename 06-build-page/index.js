console.log('# ---------------06 task start ------------------ #');


const fs = require('fs');
const path = require('path');

const prjFolderName = 'project-dist'
// const distFolderPath = path.join(__dirname, './', prjFolderName)
const distFolderPath = path.join(__dirname, prjFolderName)
const htmlFilePath = path.join(distFolderPath, 'index.html')
//---------
const cssFilePath = path.join(distFolderPath, 'style.css')
const cssSrc = path.join(__dirname, 'styles')
//-----------
const assetsPath = path.join(distFolderPath, 'assets')
const assertsSrc = path.join(__dirname, 'assets');
//-----------
const componetSrc = path.join(__dirname, 'components');
//-----------

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

// ------ create index.html file - START ----- //
createIndexHtml(htmlFilePath);

async function createIndexHtml(htmlFilePath) { 
    console.log('# - Creating index.html file...');
    try {
        let textStream = await fs.promises.readFile(path.join(__dirname, 'template.html'), 'utf8');
        await fs.promises.writeFile(htmlFilePath, textStream);
    } catch (error) {
        console.log('createIndexHtml ERROR:\n', error);
    }
    console.log('# --- DONE!');
}
// ------ create index.html file - FINISH ----- //


// ------ copy assets folder to dist folder - START ----- //
copyDir(assertsSrc, assetsPath)

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
// ------ copy assets folder to dist folder - FINISH ----- //

// ------ CSS bundle making - START ----- //
mergeCSSFiles(cssFilePath, cssSrc)

async function mergeCSSFiles(cssFilePath, cssSrc) {
    console.log('# - Creating bundle.css file...');
    console.log('# --- DONE!');
    try {
        let cssContent = '/* -=0=- css bundle file */\n';
        await fs.promises.writeFile(cssFilePath, cssContent);

        const cssFiles = await fs.promises.readdir(cssSrc, { withFileTypes: true });
            for (let file of cssFiles) {
                if (file.isFile() && path.extname(file.name) === '.css') {
                    console.log(`# - Adding to style.css ${file.name} file`);
                    await createBundleCSS(cssFilePath, cssSrc, file.name);//
                }
            }
    } catch (error) { 
        console.log('mergeCSSFiles ERROR:\n', error);
    }
    console.log('# --- Merging DONE!');
}

async function createBundleCSS(cssFilePath, cssSrc, cssContentFile) {
    try {
        let textStream = await fs.promises.readFile(path.join(cssSrc,cssContentFile), 'utf8');
        await fs.promises.appendFile(cssFilePath, textStream);
    } catch (error) {
        console.log('createBundleCSS ERROR:\n', error);
    }
}


// ---- CSS bundle making  - FINISH ----- //