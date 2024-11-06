const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
require('dotenv').config();
const app = express();
const MONGODB_URI_PROD= process.env.MONGODB_URI_PROD;

app.use(cors({origin: 'https://cerulean-alfajores-4beecc.netlify.app'}));
app.use(bodyParser.json());
app.use('/api',indexRouter);

const mongoURI = MONGODB_URI_PROD;

mongoose.connect(mongoURI)
.then(()=>{console.log('mongoose connected')})
.catch((err)=>{console.log('DB connection fail',err)})

app.listen(process.env.PORT||5003,()=>{
    console.log("server on 5003");
})