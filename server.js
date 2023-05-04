import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import mongoose, { Schema } from "mongoose";
import path from 'path'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const app = express()

app.use(express.static(path.join(path.resolve(),"public")))





mongoose.connect("mongodb://127.0.0.1:27017",{dbName:"User-data"}).then(()=>{
    console.log("connected to database")
}).catch((e)=>{
    console.log(e)
})

 const UserSchema=new mongoose.Schema({
    name:String,
    email:String,
    password:String
 })


 const UserModel = mongoose.model("user",UserSchema);




app.use(urlencoded({extended:true}))

app.use(cookieParser())


const isAuthenticated=async(req,res,next)=>{
const {email,password} = req.body;
const isFound = await UserModel.findOne({email:email})
if(isFound){

const encPassword = await bcrypt.compare(password,isFound.password)
if(encPassword){
    next()
}
else{
    res.render("400.ejs")
}
}
else{
    res.render("login.ejs",{error:"Register first ( User not Found )"});
}
}


app.get('/test',(req,res)=>{
    console.log("xyz")
    res.send("xyz");
})

app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.get('/login',async(req,res)=>{
res.render("login.ejs")
})
app.post('/checklogin',isAuthenticated,async(req,res)=>{
    const {token} = await req.cookies;
   const userObj = jwt.verify(token,"0007");
    const user = await UserModel.findById(userObj._id)
    const username = user.name;
    res.render('home.ejs',{name :username})

})



app.get('/form',(req,res)=>{
    res.render("register.ejs")
})


app.post('/register',async (req,res)=>{
const {name,email,password} = req.body

const encPassword  = await bcrypt.hash(password,10)
let user =await UserModel.create({name,email,password:encPassword})


//jwt works
const encToken = jwt.sign({_id:user._id},"0007");



res.cookie("token",encToken,{ httpOnly:true,expires:new Date(Date.now()+1000*60*60)})
// console.log(user.name)
res.send("user created successfully...")
})


app.listen(4000,()=>{
    console.log("server is listening....")
})

