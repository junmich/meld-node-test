const { Buffer } = require('buffer');

const ENCODE_TYPE = 'base64';
const CHAR_TYPE = 'ascii';
class Keys {

    static endcode(str) {
        return Buffer.from(str).toString(ENCODE_TYPE);
    }

    static decode(str) {
        return Buffer.from(str, ENCODE_TYPE).toString(CHAR_TYPE);
    }
}

module.exports = Keys;
