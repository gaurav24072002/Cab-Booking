const express = require('express')
const mongoose = require('mongoose')

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true
    },
    source:{
        type:String,
        required:true,
        trim:true
    },
    destination:{
        type:String,
        required: true,
        trim:true
    },
    car:{
        type: String,
        required: true,
        trim:true
    },
    time:{
        type: Number
    },
    price:{
        type: Number
    }
})

module.exports=mongoose.model('user',userSchema)