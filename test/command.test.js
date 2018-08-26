
const Command = require('./../command');
const expect = require('expect');

describe('Command name validation', () => {

    it('should validate command name', (done) => {
        var command = new Command('ls');
        command.init().then(() => {
            expect(typeof command.shellType).toBe('string');
            expect(command.shellType).toBe('bash'); //Assuming test runs on unix 

            expect(command.validated).toBeTruthy();
            done();
        }).catch(done);

    });
})