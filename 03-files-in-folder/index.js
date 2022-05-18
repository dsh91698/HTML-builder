const path = require('path');
const fs = require('fs');

const dirName = path.join(__dirname,);
console.log('dirName:',dirName);

function readFilesInDir(dirName) {
    fs.readdir(dirName, (err, files) => {
        if (err) {
            console.log('Error:', err);
            return;
        }
        console.log('files:', files);
    });
}

readFilesInDir(dirName);

// try {
//     const files = await fs.readdir(dirName);
//     for (const file of files)
//       console.log(file);
//   } catch (err) {
//     console.error(err);
//   }
