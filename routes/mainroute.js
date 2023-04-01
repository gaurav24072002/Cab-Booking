const express = require('express');
const route = express.Router()
const User=require('../model/user')

route.post('/', (req, res) => {
    let register=new User(req.body)
    register.save()
    .then((err, docs) =>{
        if(err){
            res.send(err)
        }else{
            res.send("Successfully Booked your Ride", req.body);
        }
    })
})

module.exports=route