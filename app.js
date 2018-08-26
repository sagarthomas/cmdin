const { exec } = require('child_process');

module.exports.run = (command) => {

    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject('The error:' + error);
                return;
            }
            resolve({stdout, stderr});
        });
    });
    
};