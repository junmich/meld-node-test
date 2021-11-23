const Storage = require('../../../src/service/Storage/Storage');

describe('Storage class', () => {
    it('Test storage class object default provider', () => {
        const storge = new Storage();
        expect(storge.provider).toBe('LOCAL');
    });
    it('Test storage class object google provider', () => {
        const storge = new Storage('GOOGLE');
        expect(storge.provider).toBe('GOOGLE');
    });
});