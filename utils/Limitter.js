const Config = require('../config');
const fs = require('fs');

const createTempDirIfExists = () => {
    if (!fs.existsSync(Config.TEMP_FOLDER)){
        fs.mkdirSync(Config.TEMP_FOLDER);
    }    
}

const logAction = (ip, method, url) => {
    createTempDirIfExists();
    let fileAction = [];
    try {
        fileAction = JSON.parse(fs.readFileSync(`./${Config.TEMP_FOLDER}/fileConfig.json`));
    } catch (error) {
        console.log('Something went wrong', error.message);
    }

    if ( method !== 'DELETE') {
        const fileEntry = fileAction.findIndex(file => (file.ip === ip && file.method === method));
        if (fileEntry < 0) {
            fileAction.push({ ip, method, count: 1 });
        } else {
            if (fileAction[fileEntry].count > 10) {
                return false;
            }
            fileAction[fileEntry].count += 1
        }
        fs.writeFile(`${Config.TEMP_FOLDER}/fileConfig.json`, JSON.stringify(fileAction), (err) => { console.log(err)});
    }
    return true;
}

module.exports = (req, res, next) => {
    let redirectUrl = req.originalUrl;
    const RequestIp = require('@supercharge/request-ip')
    const ip = RequestIp.getClientIp(req);
    if (!logAction(ip, req.method, redirectUrl)) 
    {
        return res.status(200).json({ message: 'Download limit exceeded' });
    }
    next();
}