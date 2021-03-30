const express = require('express');
const morgan = require('morgan');

const apiRouter = require('./routes/api.router');

const app = express();

// Settings
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Router API
app.use('/api', apiRouter);

// Catch error path
app.use('*', (req, res) => {
    res.status(404).json({
        error: 'Not found'
    });
});


module.exports = app;