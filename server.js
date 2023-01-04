const mongoose = require('mongoose');
const dotenv = require('dotenv');
const express = require("express");
const app = express();
const asigmntRouter = require('./routes/asigmntRouter');
const studentRouter = require('./routes/studentRouter')
const teacherRouter = require('./routes/teacherRouter');
dotenv.config({path: './config.env'});
app.use(express.json());

app.use((req,res,next)=>{
    req.requestTime = new Date().toISOString();
    //console.log(req.headers)
    next();
})

app.get('/', (req, res, nest)=>{
    res.send('Welcome to home page')
})

app.use('/api/v1/asignmnts', asigmntRouter);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/teachers', teacherRouter);

const DB = process.env.DATABASE.replace('<password>', process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
}).then(()=> console.log(`DB connection successful`));

const port = process.env.PORT || 5000;
app.listen(port, (err)=>{
    if(err){
        console.log(err);
    } else {
        console.log(`Listening at port ${port}`)
    }
})