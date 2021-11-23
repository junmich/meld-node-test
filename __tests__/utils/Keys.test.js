const Keys = require('../../utils/Keys');

describe('Keys encode and decode string', () => {
    let givenString = 'test123';
    let endcodedString = '';
    it('Test encode given String', () => {
        encodedString = Keys.endcode(givenString);
        expect(endcodedString !== givenString).toBeTruthy();
    });
    it('Test decode encoded String', () => {
        const decodedString = Keys.decode(encodedString);
        expect(decodedString === givenString).toBeTruthy();
    });
});