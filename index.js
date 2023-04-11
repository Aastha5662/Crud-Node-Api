const express = require('express');
const PORT = process.env.PORT || "8080"
require('./db/config');
const User = require('./db/user')
const app = express()
app.use(express.json())

app.post('/user',async(req,res,next)=>{
    let user =new User(req.body)
    let result =await user.save();
    result = result.toObject();
    if(result.length>0){
        res.send(result)
    }else{
        res.send({result:"No data Found"})
    }
    // res.send(result)
})
app.get('/data',async(req,res,next)=>{
    let result =await User.find()
    res.send(result)
})
app.delete('/data/:id',async(req,res,next)=>{
    let result = await User.deleteOne({_id:req.params.id})
    res.send(result)
})

app.get('/data/:id',async(req,res,next)=>{
    let result = await User.findOne({_id:req.params.id})
    if(result){
        res.send(result)
    }else{
        res.send({result:"No data found"})
    }
})
app.put('/data/:id',async(req,res,next)=>{
    let result = await User.updateOne({_id:req.params.id},{$set:req.body})
    res.send(result)
})

app.listen(PORT,(req,res)=>{
    console.log('server start')
})