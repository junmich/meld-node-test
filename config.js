const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env' ) });

const FOLDER = process.env.FOLDER || '/tmp/meld';
const PORT = process.env.PORT || '3000';

const SECRET = process.env.SECRET || 'meld';
const PROVIDER = process.env.PROVIDER || 'local';
const TEMP_FOLDER = process.env.TEMP_FOLDER || 'tmp';

const UPLOAD_LIMIT = process.env.UPLOAD_LIMIT || 10;
const DOWNLOAD_LIMIT = process.env.DOWNLOAD_LIMIT || 10;

module.exports = {
    FOLDER,
    PORT,
    SECRET,
    PROVIDER,
    TEMP_FOLDER,
};