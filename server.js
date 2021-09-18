const {globalVariables} = require('./config/configuration');
const express = require('express');
const path = require('path');
const app = express();
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose');
const ejs = require('ejs');
const bcrypt = require('bcryptjs');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const { connected } = require('process');
const port = process.env.PORT || 5000;

//Database Connection
mongoose.connect('mongodb://localhost/waawmessenger')
 .then(connected => console.log('Database connected successfully'))
 .catch(err => console.log('Error connecting to Database'));





 //Configure express
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


//Session Configuration
app.use(cookieParser());

app.use(session({
    secret: 'sanzo',
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge: Date.now() + 3600 * 24 * 60 * 60},
    store: MongoStore.create({
        mongoUrl:'mongodb://localhost/waawmessenger',
        ttl: 3600 * 24 * 60 * 60
    })
}));

//morgan
app.use(logger('dev'));

//Initialize Passport
app.use(passport.initialize());
app.use(passport.session());


//Flash and Morgan Configuration
app.use(logger('dev'));
app.use(flash());

//app.use(globalVariables);

//Views Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//const defaultRoutes = require('./routes/default/default.routes');
//const authRoutes = require('./routes/auth/auth.routes');
//const User = require('./models/User');


app.get('/',(req,res)=>{
    res.render('default/index')
})

app.get('/home',(req,res) =>{
    res.render('auth/register')
})

app.get('/login',(req,res)=>{
    res.render('auth/resetPassword')

})






















 app.listen(port,()=>console.log(`Server running on port ::: ${port}`));
