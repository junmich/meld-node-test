const Storage = require('./Storage');
const multer = require('multer');
const Config = require('../../../config');
const fs = require('fs');

class LocalStorage extends Storage {
    storage = multer.diskStorage({
        destination: function (req, file, callback) {
            if (!fs.existsSync(Config.FOLDER)){
                fs.mkdirSync(Config.FOLDER);
            }
            callback(null, Config.FOLDER);
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });
    
    uploadFile(key, req, res, callback) {
        const upload = multer({ storage: this.storage }).single(key);
        return upload(req, res, callback);
    }

    downloadFiles (res) {
        const fs = require('fs');
        const directory = Config.FOLDER;
        require('express-zip');
        const filesZip = [];
        fs.readdir(directory, (err, files) => {
            if (files.length === 0) return res.status(400).json({ message: 'No file to download.'} );
            for (const file of files) {
                const fileToDownload = `${directory}/${file}`;
                filesZip.push({ path: fileToDownload, name: file});
            }
            res.zip(filesZip, 'anything.zip'); 
        });
    }

    deleteFiles () {
        const fs = require('fs');
        const path = require('path');

        const directory = Config.FOLDER;

        fs.readdir(directory, (err, files) => {
            if (err) throw err;

            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                if (err) return false;
                });
            }
        });
        return true;
    }
}

module.exports = LocalStorage;
