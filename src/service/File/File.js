const Keys = require("../../../utils/Keys");
const Constant = require('../../../utils/Constant');

const Config = require('../../../config');
const LocalStorage = require('../../service/Storage/LocalStorage');
const GoogleStorage = require("../Storage/GoogleStorage");

const PUBLIC = Constant.PUBLIC_KEY_MATCHER;
const PRIVATE = Constant.PRIVATE_KEY_MATCHER;
const PROVIDER = Config.PROVIDER;


class File {
    constructor() {
        this.key = null;
        this.public = PUBLIC;
        this.private = PRIVATE;
        if (PROVIDER === Constant.PROVIDER_LOCAL) {
            this.storage = new LocalStorage();
        } else if (PROVIDER === Constant.PROVIDER_GOOGLE) {
            this.storage = new GoogleStorage();
        }
    }

    verifyKeyIsValid (type) {
        if (!this.key) return false;
        const decodedKey = Keys.decode(this.key).split(Constant.SEPARATOR);
        return decodedKey[0] === Config.FOLDER 
            && decodedKey[1] === Config.SECRET
            && decodedKey[2] === type;
    }

    uploadFile (req, res, callback) {
        return this.storage.uploadFile('file', req, res, callback);
    }
}

module.exports = File;