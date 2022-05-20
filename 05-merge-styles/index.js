console.log('05 task');
//----------------------------------------------------------------------------------------------------------------------
const path = require('path');
const fs = require('fs');

const cssFolder = path.join(__dirname, 'styles');
const htmlFolder = path.join(__dirname, 'project-dist');
const cssFileName = 'bundle.css';

mergeCSSFiles(cssFolder, htmlFolder, cssFileName); // main function call

async function mergeCSSFiles(cssFolder, htmlFolder, cssFileName) {
    try {
        let cssContent = '/* -=3=- css bundle file */\n';
        await fs.promises.writeFile(path.join(htmlFolder, cssFileName), cssContent);

        const cssFiles = await fs.promises.readdir(cssFolder, { withFileTypes: true });
            for (let file of cssFiles) {
                if (file.isFile() && path.extname(file.name) === '.css') {
                    console.log(`${file.name} - ${path.extname(file.name)}`);
                    await createBundleCSS(cssFolder, htmlFolder, cssFileName, file.name);
                }
            }
    } catch (error) { 
        console.log('mergeCSSFiles ERROR:\n', error);
    }
}

async function createBundleCSS(cssFolder, htmlFolder, cssFileName, cssContentFile) {
    try {
        let textStream = await fs.promises.readFile(path.join(cssFolder,cssContentFile), 'utf8');
        await fs.promises.appendFile(path.join(htmlFolder, cssFileName), textStream);
    } catch (error) {
        console.log('createBundleCSS ERROR:\n', error);
    }
}

// async function onBundleExists(htmlFolder, cssFileName) { 
//     try {
//         await fs.promises.access(path.join(htmlFolder, cssFileName), fs.constants.F_OK);
//         console.log(`# --- css bundle exists, removing:\n${cssFileName}`);
//         await fs.promises.rm(path.join(htmlFolder, cssFileName), { recursive: true, force: true });
//         console.log(`# --- css bundle removing DONE!`);
//         // The check OK, folder exists
//     } catch (error) {
//         console.log(`# --- bundle ${cssFileName} DOES NOT exists`);
//         // The check is notOK, folder does not exists
//     }
// }
