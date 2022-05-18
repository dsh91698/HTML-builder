const path = require('path');
const fs = require('fs');
const folderName = 'secret-folder';

const dirName = path.join(__dirname, folderName);
console.log('dirName:', dirName);
// let filesArr = [];

// function readFilesInDir(dirName) {
//     fs.readdir(dirName, {withFileTypes:true}, (err, files) => {
//         if (err) {
//             console.log('Error:', err);
//             return;
//         }
//         console.log('files:', files);
//     });
// }

async function readFilesInDir(dirName) {
    // let filesArr = [];
    //let fileSize;
    try {
        const files = await fs.promises.readdir(dirName, { withFileTypes: true });
        //console.log('files:', files);
        for (let file of files) {
            // fileSize = getFileSize(file);
            const fileSize = await fs.promises.stat(path.join(dirName, file.name));
            // console.log('fileSize:', fileSize);

            if (file.isFile()) {
                // fileSize = getFileSize(file);
                //console.log('fileSize:', fileSize);
                // filesArr.push(`${file.name} - ${path.extname(file.name)} - ${fileSize.size} bytes `);
                console.log(`${file.name} - ${path.extname(file.name)} - ${fileSize.size} bytes `);
            }
        }
        // console.log(file.isFile());
    } catch (err) {
        console.error(err);
    }
    // return filesArr;
} // readFilesInDir(dirName);

async function getFileSize(file) { 
    fs.stat(path.join(dirName, file.name), (err, stats) => {
        return stats.size;
    })
    // let fileSize =  fs.stat(path.join(dirName, file.name), (err, stats) => {
    //     console.log(stats.size)
    //     return stats.size;
    // });
    // console.log('fS:', fS);
    // return fS;
}

//readFilesInDir(dirName).then((f) => {console.log('files:', f);});
let a = readFilesInDir(dirName)
// a.then((f) => {console.log('files:', f)});

