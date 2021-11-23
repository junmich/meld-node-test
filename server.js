require('./config');
const port = process.env.PORT || 5000;

// used express for server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// body parsing or request
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// I know this is not the best practice, but for now allow all domain to access the API
app.use(cors());

// making sure that api server is running
app.get('/', (req, res) => {
    return res.send ({ 'name': 'MELD node js test'});
});
// limitter middleware
const limitter = require('./utils/Limitter');
app.use(limitter);

// files api
const apiFiles = require('./src/api/Files');
app.use('/files', apiFiles);

app.listen(port, () => console.log(`Listening to port ${port}`));

// cron services
require('./src/task/cron');

// export this for testing purposes
module.exports = app;