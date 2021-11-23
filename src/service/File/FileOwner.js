const File = require('./File');

class FileOwner extends File {
    constructor(key) {
        super();
        this.key = key;
    }

    deleteFiles (res) {
        if (!this.verifyKeyIsValid(this.private)) {
            return res.status(400).json({message: 'Invalid private key.'});
        }

        if (this.storage.deleteFiles()) {
            res.json({ message: 'Files deleted successfully.'});
        };
    }
}

module.exports = FileOwner;
