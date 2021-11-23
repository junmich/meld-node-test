const File = require('../../../src/service/File/File');

describe('File class', () => {
    it('Test File class object', () => {
        const key = 'fileFilePath';
        const file = new File();
        expect(file.key).toBeNull();
    });
    it('Test File upload', () => {
            // const file = new File();
            // expect(file.uploadFile(req, res, function(err) {

            // })).toBeDefined();
    });
});