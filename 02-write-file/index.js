const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const fileInDir = path.join(__dirname, 'text.txt');

stdout.write('Hello {username} !\n');

let writeToFileStream = fs.createWriteStream(fileInDir);

stdin.on('data', data => {
    let onExit = data.toString().trim() === 'exit';
    console.log('data.toString(): ', data.toString());
    if (onExit) {
        writeToFileStream.end();
        stdin.destroy();
        process.exit();
    } else {
        writeToFileStream.write(data)
    }
});

process.on('exit', () => stdout.write('Удачи {username} в изучении Node.js!'));
