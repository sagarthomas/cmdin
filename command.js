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

    async validate() {
        return new Promise((resolve, reject) => {
            var validator = (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                    return;
                } else if (stdout === '') {
                    var err = {
                        errMsg: `No such command '${this.cmd}' found.`,
                        stderr
                    };
                    reject(err);
                } else {
                    resolve(true);
                }
            }
            if (this.shellType === 'CMD') {
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

    async identifyShell() {
        return new Promise((resolve, reject) => {
            exec('echo $SHELL', (error, stdout, stderr) => {
                if (error) {
                    console.log(`Unidentified shell ${error}`);
                    return;
                } else if (stdout === '$SHELL') {
                    resolve('CMD');
                } else {
                    resolve(stdout.trim().split('/').pop());
                }
            });
        });
    }
}

module.exports = Command;