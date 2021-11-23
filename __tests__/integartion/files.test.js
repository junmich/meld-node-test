const request = require('supertest')
const app = require('../../server');

const fs = require('fs');

describe('Files API test', () => {
    beforeAll(() => {
        fs.writeFile(`${__dirname}/test.json`, JSON.stringify({ test: 'test'}), async (err)  => {
            if (err) return false;
        });
    });
    afterAll(() => {
        fs.unlink(`${__dirname}/test.json`, err => {
            if (err) console.log(err);
        });
    }); 
    it('should get api message', async () => {
        const res = await request(app).get('/');
        expect(res.status).toBe(200);
        expect(res.body.name).toBeDefined();
    });

    it('should upload file', async () => {
        const res = await request(app)
            .post('/files')
            .attach('file', `${__dirname}/test.json`);
        expect(res.body.privateKey).toBeDefined();
        expect(res.body.publicKey).toBeDefined();
    });

    it('should download uploaded files', async() => {
        const res = await request(app)
            .post('/files')
            .attach('file', `${__dirname}/test.json`);
        expect(res.body.privateKey).toBeDefined();
        expect(res.body.publicKey).toBeDefined();
        const resDownload = await request(app)
            .get(`/files/${res.body.publicKey}`);
        expect(resDownload.status).toBe(200);
        expect(resDownload.type).toBe('application/zip');
        expect(resDownload.headers['content-disposition']).toBe('attachment; filename="anything.zip"');
    });

    it('should delete uploaded files', async() => {
        const res = await request(app)
            .post('/files')
            .attach('file', `${__dirname}/test.json`);
        const resDelete = await request(app)
            .delete(`/files/${res.body.privateKey}`);
        expect(resDelete.status).toBe(200);
        expect(resDelete.body.message).toBe('Files deleted successfully.');
    });
})