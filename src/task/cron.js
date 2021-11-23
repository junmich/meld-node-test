const Config = require('../../config');
const nodeCron = require('node-cron');
const LocalStorage = require('../service/Storage/LocalStorage');
const GoogleStorage = require('../service/Storage/GoogleStorage');
const fs = require('fs');

// run every 9pm daily
nodeCron.schedule('0 0 21 * * *', () => {
    let storage;
    if (Config.PROVIDER === 'local') {
        storage = new LocalStorage();
    } else if (Config.PROVIDER === 'google') {
        storage = new GoogleStorage();
    }
    if(!localStorage.deleteFiles()) {
        console.log('No file(s) deleted.');
    }
});

const resetDailyConfig = () => {
    const Config = require('../../config');
    const path = require('path');
    fs.unlink(`${path.join(Config.TEMP_FOLDER, 'fileConfig.json')}`, err => {
        if (err) {
            return false;
        }
    });
}

// run every 8pm daily
nodeCron.schedule('0 0 20 * * *', () => {
    // reset daily limmiter
    resetDailyConfig();
});
