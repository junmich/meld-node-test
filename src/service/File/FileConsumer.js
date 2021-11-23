const File = require('./File');

class FileConsumer extends File {
    constructor(key) {
        super();
        this.key = key;
    }

    async retrieveFiles (res) {
        if (!this.verifyKeyIsValid(this.public)) {
            return res.status(400).json({message: 'Invalid public key.'});
        }
        return this.storage.downloadFiles(res);
    }
}

module.exports = FileConsumer;
