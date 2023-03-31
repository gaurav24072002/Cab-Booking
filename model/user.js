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
        required:true
    },
    destination:{
        type:String,
        required: true
    },
    car:{
        type: Number,
        required: true
    },
})

module.exports=mongoose.model('user',userSchema)