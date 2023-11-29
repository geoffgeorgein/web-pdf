import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const app=express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());




const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.json('hello world1')
})




app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});