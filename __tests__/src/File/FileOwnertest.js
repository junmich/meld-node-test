const FileOwner = require('../../../src/service/File/FileOwner');
const Keys = require('../../../utils/Keys');

describe('File Owner class', () => {
    let validPulbicKey;
    let validPrivateKey;
    beforeAll(() => {
        validPulbicKey = Keys.endcode(`files:meld_exam:PUBLIC`);
        validPrivateKey = Keys.endcode(`files:meld_exam:PRIVATE`);
    });
    it('Test FileOwner accept key', () => {
        const key = 'fileFilePath';
        const file = new FileOwner(key);
        expect(file.key).toBe(key);
    });
    it('Test FileOwner invalid key', () => {
        const file = new FileOwner('INVALID KEY');
        expect(file.verifyKeyIsValid('PRIVATE')).toBeFalsy();
    });
    it('Test FileOwner valid private key', () => {
        const file = new FileOwner(validPrivateKey);
        expect(file.verifyKeyIsValid('PRIVATE')).toBeTruthy();
    });
});