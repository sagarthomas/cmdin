const { exec } = require('child_process');
const Command = require('./command');


/**
 * Returns a command object
 * @param {*} command 
 */
module.exports.run = (command, args) => {

    return new Promise((resolve, reject) => {
        let cmd = new Command(command);
        cmd.init().then(() => {
            cmd.with(args).then((res) => {
                resolve(res);
            }).catch(e => reject(e));
        });
    });
}