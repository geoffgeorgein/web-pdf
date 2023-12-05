import express  from "express";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import fs from "fs";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import User from "./models/User.js";
import mongoose from "mongoose";



const upload = multer({ dest: 'uploads/' })

dotenv.config();


const app=express();

app.use(express.json({limit:"30mb",extended:true}));
app.use(express.urlencoded({limit:"30mb",extended:true}));
app.use(cors());


mongoose.connect(process.env.CONNECTION_URL)

const salt=bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';


const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.json('hello world1')
})

app.post('/file',upload.single('file'),(req,res)=>{
  console.log("file",req.file);

  let {originalname,path}=req.file;
    const parts=originalname.split('.');
    const ext=parts[parts.length-1];

    let npath=path.split('\\');
    npath[1]=parts[0];
    
    const newPath=npath[0]+'\\'+'1'+'.'+ext;
    console.log("npath",newPath);
    console.log("body")
    fs.renameSync(path, newPath);
    res.json('file uploaded')
})

app.post('/signup',async(req, res) => {
  const {username,password}=req.body;

  try {
    const existinguser = await User.findOne({ username });
    if (existinguser) {
      return res.status(511).json({ message: "User already Exist." });
    }
    console.log("sign-up")
    
    const UserDoc=await User.create({
        username,
        password:bcrypt.hashSync(password,salt)
    });
    res.json(UserDoc);
  }
  catch(error){
    res.status(500).json("Something went worng...");
  }
})

app.post('/login',async(req, res)=>{
    
  const {username,password} = req.body;
  const userDoc=await User.findOne({username});
  console.log("User",username);

  const passOK=bcrypt.compareSync(password,userDoc.password);


  if(passOK){
      jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
          if (err) throw err;
          res.cookie('token', token).json({
            id:userDoc._id,
            username,
          });
        });
  }
  else {
      res.status(400).json("wrong credentials");
    }

}
);




app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});