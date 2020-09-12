//MODULES
const debug = require('debug')('app:debug');  // set env variable DEBUG=app:debug to enable console messages
const config = require('config');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(helmet());
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
if (app.get('env') === 'development') {
    app.use(morgan('tiny'));
    debug('Development Environment: Logging Enabled!');
}

//ROUTES
const home = require('./routes/home');
const users = require('./routes/users');
app.use('/', home);
app.use('/api/users', users);

//START HTTP SERVER
const port = process.env.PORT || config.get('port');
//server will start on port set in env variable or on port set in ./config/default.json
app.listen(port, () => console.log(`Running on port ${port}...`));
