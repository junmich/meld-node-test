const FileConsumer = require('../../../src/service/File/FileConsumer');
const Keys = require('../../../utils/Keys');

describe('File Consumer class', () => {
    let validPulbicKey;
    let validPrivateKey;
    beforeAll(() => {
        validPulbicKey = Keys.endcode(`files:meld_exam:PUBLIC`);
        validPrivateKey = Keys.endcode(`files:meld_exam:PRIVATE`);
    });
    it('Test FileConsumer accept key', () => {
        const key = 'fileFilePath';
        const file = new FileConsumer(key);
        expect(file.key).toBe(key);
    });
    it('Test FileConsumer invalid key', () => {
        const file = new FileConsumer('INVALID KEY');
        expect(file.verifyKeyIsValid('PUBLIC')).toBeFalsy();
    });
    it('Test FileConsumer valid public key', () => {
        const file = new FileConsumer(validPulbicKey);
        expect(file.verifyKeyIsValid('PUBLIC')).toBeTruthy();
    });
    it('Test FileConsumer valid private key', () => {
        const file = new FileConsumer(validPrivateKey);
        expect(file.verifyKeyIsValid('PUBLIC')).toBeFalsy();
    });
});