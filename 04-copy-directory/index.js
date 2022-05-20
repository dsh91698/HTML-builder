console.log('task copy-folder')

const fs = require('fs');
const path = require('path');

const folderName = 'files'
const destName = `${folderName}-copy`
const src = path.join(__dirname, folderName)
const dest = path.join(__dirname, destName)

copyDir(src, dest)



async function copyDir() {
    try {
        await fs.promises.mkdir(dest, { recursive: true });
        await copyFilesInDir(src);
    } catch (error) {
        console.log('CopyDir error:', error)
    }
}

async function copyFilesInDir(dirName) {
    try {
        const files = await fs.promises.readdir(dirName, { withFileTypes: true });
        for (let file of files) {
            if (file.isFile()) {
                // console.log(`${file.name} - ${path.extname(file.name).slice(1)} - ${fileSize.size} bytes `);
                await fs.promises.copyFile(path.join(dirName, file.name), path.join(dest, file.name));
            }
        }
    } catch (err) {
        console.error('copyFile error:', err);
    }
} // readFilesInDir(dirName);


// async function copyDir1() {
//     const files = await fs.readdir(src)
//     if (!fs.existsSync(dest)) {
//         fs.mkdirSync(dest)
//     }
//     files.forEach(file => {
//         const srcPath = path.join(src, file)
//         const destPath = path.join(dest, file)
//         if (fs.lstatSync(srcPath).isDirectory()) {
//         copyDir(srcPath, destPath)
//         } else {
//         fs.copyFileSync(srcPath, destPath)
//         }
//     })
// }


// function copyDirSync(src, dest) {
//   const files = fs.readdirSync(src)
//   if (!fs.existsSync(dest)) {
//     fs.mkdirSync(dest)
//   }
//   files.forEach(file => {
//     const srcPath = path.join(src, file)
//     const destPath = path.join(dest, file)
//     if (fs.lstatSync(srcPath).isDirectory()) {
//       copyDir(srcPath, destPath)
//     } else {
//       fs.copyFileSync(srcPath, destPath)
//     }
//   })
// }