//importing packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const ip = require("ip");
require("dotenv").config();
const Data = require('./model/data');

//express app setup
const app = express();
app.use(cors());
app.use(bodyParser.json());
const ipAddress = ip.address();

//env
const port=process.env.portNo || 3000
const passDB=process.env.passwordOfDatabase

//server initialized
app.listen(port, (req, res) => {
    console.log(`server is running  on ${ipAddress}:${port}`);
})

//connecting server to DB mongoDB
mongoose.connect(`mongodb+srv://nature-nest:${passDB}@cluster0.kb623gc.mongodb.net/`, {}).then(() => { console.log("Mongo DB Connected !") }).catch((err) => {
    console.log(`error occured while connecting to MongoDB ${err}`);
})

app.get("/",(req,res)=>{
    res.send("hello there the server is working");
})

//endpoints(routes):
app.post("/createUser", async (req, res) => {
    const { userId } = req.body;
    try {
        const existingUser = await Data.findOne({ userId });
        if (existingUser) {
            return res.status(200).json({ message: "user already exists !" });
        }
        const newData = new Data({ userId: userId });
        await newData.save();
        res.status(201).send('User created successfully');
    } catch (err) {
        console.log("error in creating user", err);
        res.status(500).send('Server error');
    }

})

app.get(`/:userId`, async (req, res) => {
    try {
        const currentUser = req.params.userId;
        const data = await Data.findOne({ userId: currentUser });
        res.status(200).json(data)
    } catch (err) {
        console.log("error in getting the data : ", err);
        res.status(500).json({message:"server error"})
    }
})

app.post("/updateScore/:userId",async(req,res)=>{
    const userId=req.params.userId;
    const {name,score}=req.body;
    console.log(name, score);
    try{
        const field=name+"Score";
        await Data.findOneAndUpdate(
            {userId:userId},
            {$set:{[field]:score}}
        )
        res.status(200).json({message:"Updated The DB !"});
    }catch(err){
        console.log("error updating Db",err);
        res.status(500).send("Server Error");
    }
})

app.post("/updateScore/:userId/name",async(req,res)=>{
    const userId=req.params.userId;
    const {name}=req.body;
    console.log(name);
    try{
        await Data.findOneAndUpdate(
            {userId:userId},
            {$set:{"name":name}}
        )
        res.status(200).json({message:"Updated The DB !"});
    }catch(err){
        console.log("error updating Db",err);
        res.status(500).send("server error");
    }
})

