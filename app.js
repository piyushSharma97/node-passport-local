const express = require('express');
const expressLayouts = require('express-ejs-layouts');

const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
require('./config/passport')(passport)

require('./db/db')

// Express body parser
app.use(express.urlencoded({ extended: true }));
//ejs
app.use(expressLayouts)
app.set('view engine','ejs')
app.use(session({
    secret: 'secret_key',
    resave: true,
    saveUninitialized: true,
  }))
  // passport middlesware
  app.use(passport.initialize());
  app.use(passport.session());
// Connect flash
app.use(flash());
// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//Routes
app.use('/',require('./routes/index'))
app.use('/users',require('./routes/user'))
const PORT = process.env.PORT||5000;


app.listen(PORT,()=>{
    console.log(`server started at port ${PORT}`);
});