
const Command = require('./../command');
const expect = require('expect');

describe('Command name validation', () => {

    it('should validate shell type', (done) => {
        let command = new Command('ls');
        command.init().then(() => {
            expect(typeof command.shellType).toBe('string');
            //Test is currently only running on linux systems
            //Will implement Windows testing soon
            expect(command.shellType).toBe('bash');
            done();
        }).catch(done);
    });

    it('should validate command name', (done) => {
        let command = new Command('ls');
        command.init().then(() => {
            expect(command.validated).toBeTruthy();
            done();
        }).catch(done);
    });

    it('should catch a non-valid command', (done) => {
        let command = new Command('superfluffycat907');
        command.init().then().catch((e) => {
            expect(e.errMsg).toBe(`No such command 'superfluffycat907' found.`);
            done();
        });
    });
});

describe('Command execution', () => {
    let command = new Command('ls');
    it('should get full command with given args', (done) => {
        command.init().then(() => {
            command.with(["-a"]).then((res) => {
                expect(res.fullCmd).toBe('ls -a');
                done();
            }).catch(done);
        }).catch(done);
    });

    it('should catch invalid args', (done) => {
        command.init().then(() => {
            command.with(["something"]).then().catch((e) => {
                expect(e.errMsg).toBe(`The arguments for ls are invalid.`);
                done()
            });
        });
    });
});