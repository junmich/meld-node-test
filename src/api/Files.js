const express = require('express');
const Keys = require('../../utils/Keys');
const LocalStorage = require('../service/Storage/LocalStorage');
const router = express.Router();
const Config = require('../../config');
const FileOwner = require('../service/File/FileOwner');
const FileConsumer = require('../service/File/FileConsumer');

router.get('/:key', async (req, res) => {
    const fileConsumer = new FileConsumer(req.params.key);
    return fileConsumer.retrieveFiles(res);
});

router.delete('/:key', async (req, res) => {
    const fileOwner = new FileOwner(req.params.key);
    return fileOwner.deleteFiles(res);
});

router.post('/', async (req, res) => {
    const fileOwner = new FileOwner(null);
    return fileOwner.uploadFile(req, res, function (err) {
        if (err) {
            res.status(500).json({ err });
        } else {
            const respose = {
                publicKey: Keys.endcode(`${Config.FOLDER}:${Config.SECRET}:PUBLIC`),
                privateKey: Keys.endcode(`${Config.FOLDER}:${Config.SECRET}:PRIVATE`),
            };
            res.status(200).json(respose);
        }
    });
});

module.exports = router;