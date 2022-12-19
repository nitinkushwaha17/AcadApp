if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}
const express = require('express');
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL || 'mongodb://localhost:27017/acadapp');
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", ()=>{
    console.log("Database connected");
});

const app = express();

app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
    res.send("Hello, world!");
});

app.listen(3000, ()=>{
    console.log('server started on port 3000');
});