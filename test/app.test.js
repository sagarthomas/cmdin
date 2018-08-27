const app = require('./../app');
const expect = require('expect');

describe('Main API functions', () => {

    it('should return a command object', (done) => {
        app.run('ls',['-a']).then((res) => {
            console.log(res);
            done();
        }).catch(done);   
    });

    it('should throw an arg error when executing', (done) => {
        app.run('ls', ['something']).then().catch(e => {
            console.log(e);
            done();
        });
    });

    it('should not crash when given no arguments when its not needed', (done) => {
        app.run('ls').then((res) => {
            expect(res.success).toBeTruthy();
            done();
        }).catch(done);
    });
});