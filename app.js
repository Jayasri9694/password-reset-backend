const express = require('express');
const { tokenGate } = require('./Middleware/AuthGates');
const APP_SERVER = express();
// Middleware to parse JSON bodies
APP_SERVER.use(express.json());
APP_SERVER.get('/',(req,res,next) => {
    res.send('<h1>PASSWORD RESET TASK</h1>')
});
APP_SERVER.use('/signup', require('./controllers/SignUp.controller'));
APP_SERVER.use('/users', require('./controllers/users.controller'));
APP_SERVER.use('/login', require('./controllers/Login.controller'));
APP_SERVER.use('/forgot', require('./controllers/Forgot.controller'));
APP_SERVER.use('/reset', require('./controllers/reset.controller'));

module.exports = APP_SERVER;