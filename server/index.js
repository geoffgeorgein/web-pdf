import express  from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";

const upload = multer({ dest: 'uploads/' })

dotenv.config();


const app=express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());




const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.json('hello world1')
})

app.post('/file',upload.single('file'),(req,res)=>{
  console.log("file",req.file);

  const {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];
    const newPath = path+'.'+ext;

    console.log("body")
    fs.renameSync(path, newPath);
  res.json('file uploaded')
})




app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});