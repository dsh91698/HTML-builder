const fs = require('fs');
const path = require('path');
text_url = path.join(__dirname, 'text.txt')

// fs.readFile(text_url, 'utf8', (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//    // console.log("__dirname: " + __dirname);
//     console.log(data);
//   });
  
let textstream = fs.createReadStream(text_url, 'utf8');
textstream.pipe(process.stdout);