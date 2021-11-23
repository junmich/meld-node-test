const Storage = require('./Storage');
const Config = require('../../../config');
const GoogleCloudStorage = require('@google-cloud/storage');
const multer = require('multer');

const GCStorage = GoogleCloudStorage.Storage;

class GoogleStorage extends Storage {
    constructor() {
        super();
        this.goolgeStorage = new GCStorage ({ keyFilename: Config.GOOGLE_KEY_PATH });
    }

    
    
    async uploadFile(key, req, res, callback) {
        const upload = multer({
            storage: multer.memoryStorage(),
            limits: {
                // no larger than 5mb.
                fileSize: 5 * 1024 * 1024,
            },
          }).single(key);

        upload(req, res, async (err) => {
            const { originalname, buffer } = req.file;
            const stream = require('stream');
            const gcFile = this.goolgeStorage.bucket(Config.BUCKET_NAME).file(originalname);

            const dataStream = new stream.PassThrough();
            dataStream.push(buffer);
            dataStream.push(null);
            await dataStream.pipe(gcFile.createWriteStream(
                {
                    resumable  : false,
                    validation : false,
                    metadata   : {'Cache-Control': 'public, max-age=31536000'}
                }
            ));

            callback('', '');
        });
    }


    async downloadFiles(res) {
        const bucketName = Config.BUCKET_NAME;
        const directory = Config.DOWNLOAD_TEMP_FOLDER;
        const fs = require('fs');
        if (!fs.existsSync(directory)){
            fs.mkdirSync(directory);
        }

        require('express-zip');
        const [files] = await this.goolgeStorage.bucket(bucketName).getFiles();
        
        for (let file of files) {
            console.log(file.name);
            const options = {
                destination: `${directory}/${file.name}`,
              };
            console.log(options);
            await this.goolgeStorage.bucket(bucketName).file(file.name).download(options);
        }

        
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

    async deleteFiles() {
        const bucketName = Config.BUCKET_NAME;
        const [files] = await this.goolgeStorage.bucket(bucketName).getFiles();

        for (let file of files) {
            await this.goolgeStorage.bucket(bucketName).file(file.name).delete();
        }
        return true;
    }
}

module.exports = GoogleStorage;
