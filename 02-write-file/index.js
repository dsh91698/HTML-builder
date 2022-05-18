// --------------------------------------------------------------------------------------------------------------------
const { stdin, stdout } = process;
const fs = require('fs');
const path = require('path');
const fileName = 'text.txt'
const fileInDir = path.join(__dirname, fileName);
//--------------------------------------------------------------------------------------------------------------------

// greeting - start -----------------------------------------------------------------------------------------------
stdout.write('Hello {username} !\n');
stdout.write('You can type something in terminal and it will be added into the text.txt file\n');
stdout.write('after you push the Enter button!\n');
// greeting - finish ----------------------------------------------------------------------------------------------------

// create file stream ----------------------------------------------------------------------------------------------------
let writeToFileStream = fs.createWriteStream(fileInDir);

// write to file stream -------------------------------------------------------------------------------------------------------
stdin.on('data', data => {
    let onExit = data.toString().trim() === 'exit'; //bool flag: TRUE if user typed 'exit' in console
    if (onExit) {
        CntrlCHandler(); // if user typed 'exit' in console, terminate the seance and exit the program
    } else {
        writeToFileStream.write(data)
    }
});

function CntrlCHandler() {
    writeToFileStream.end();
    stdin.destroy();
    process.exit();
  }

process.on('exit', () => stdout.write('Удачи {username} в изучении Node.js!'));
process.on('SIGINT', () => { CntrlCHandler() }); // handle Ctrl+C
