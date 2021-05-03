const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const morgan = require('morgan');

const apiRouter = require('./routes/api.router');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(cors());
app.options('*', cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/',
    createParentPath: true
}));
app.use( express.static('public'));

// Router API
app.use('/api', apiRouter);

// Catch error path
/* app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not found'
    });
});
 */

module.exports = app;