if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

require('./config/passport')(passport)

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/acadapp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const app = express();

if (process.env.NODE_ENV !== 'production') {
    app.use(require('cors')())
}
app.use(express.urlencoded({extended:true}));
app.use(express.json())
app.use(express.static(path.resolve(__dirname, './frontend/build')));

// Sessions
app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 30*24*60*60*1000
      },
      store: MongoStore.create({mongoUrl: process.env.DB_URL||'mongodb://localhost:27017/acadapp'}),
    })
);
  
// Passport middleware
app.use(passport.session());
app.use('/add', require('./routes/add'));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/post'));
app.use('/settings', require('./routes/settings'));
app.use('/notification', require('./routes/notification'));

app.get('/', (req,res)=>{
    console.log(req.session);
    res.send("Hello, world!");
});
const Subject = require('./models/Subject');
const Dept = require('./models/Dept');
// app.get('/subjects', async(req,res)=>{
//     let subjects = await Subject.find({});
//     res.status(200).send(subjects);
// })
// app.get('/dept', async(req,res)=>{
//     let depts = await Dept.find({});
//     res.status(200).send(depts);
// })
// app.post('/subjects', async(req,res)=>{
//     let subjects = await Subject.find({});
//     res.send(subjects);
// })

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, './frontend/build', 'index.html'));
});

app.listen(3000, ()=>{
    console.log('server started on port 3000');
});