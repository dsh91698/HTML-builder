const fs = require('fs');
const path = require('path');
text_url = path.join(__dirname, 'text.txt')
  
let textstream = fs.createReadStream(text_url, 'utf8');
textstream.pipe(process.stdout);