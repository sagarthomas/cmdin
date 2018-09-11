//const { exec } = require('child_process');
const util = require('util');
const exec = util.promisify(require('child_process').exec);


class Command {
    constructor(cmd) {
        this.cmd = cmd;
        this.validated = false;
    }

    async init() {
        this.shellType = await this.identifyShell();
        this.validated = await this.validate();
    }

    validate() {
        return new Promise((resolve, reject) => {
            var validator = (error, stdout, stderr) => {
                if (error) {
                    reject({errMsg: `No such command '${this.cmd}' found.`, error});
                    return;
                } else {
                    resolve(true);
                }
            }
            if (this.shellType === 'pwsh') {
                exec(`where ${this.cmd}`, (error, stdout, stderr) => {
                    validator(error, stdout, stderr);
                });
            } else {
                exec(`command -v ${this.cmd}`, (error, stdout, stderr) => {
                    validator(error, stdout, stderr);
                });
            }
        });
    }

    identifyShell() {
        return new Promise((resolve, reject) => {
            exec('echo $SHELL', (error, stdout, stderr) => {
                if (stdout === '') {
                    resolve('pwsh');
                } else {
                    resolve(stdout.trim().split('/').pop());
                }
            });
        });
    }

    with(args = []) {
        let fullCmd = this.cmd + ' ';
        args.forEach(element => {
            fullCmd += element + ' ';
        });
        fullCmd = fullCmd.trim(' ');

        return new Promise((resolve, reject) => {
            exec(fullCmd, (error, stdout, stderr) => {
                if (error) {
                    let err = {
                        errMsg: `The arguments for ${this.cmd} are invalid.`,
                        success: false,
                        error
                    };
                    reject(err);
                    return;
                }
                resolve({stdout, stderr, fullCmd, success: true});
            });
        });
    };
}

module.exports = Command;