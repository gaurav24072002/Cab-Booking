const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MainRouter = require('./routes/mainroute')

app.use(bodyParser.json());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())
app.use('/', MainRouter);

const Mongourl='mongodb://localhost:27017/cabKaro'                     
const MongoOnline='mongodb+srv://gaurav02maheshwari:LjscD8OzxbQzqDhX@cluster0.tzb0m64.mongodb.net/cabKaro?retryWrites=true&w=majority'
mongoose.connect(MongoOnline || Mongourl).then( ()=>
console.log("Connected to mongo Successful")
).catch((e)=> {
    console.log("Error : " + e);
})


app.listen(5000,()=>console.log("Running on 5000"))