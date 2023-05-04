import express, { urlencoded } from 'express'
import path from "path"
import mongoose from 'mongoose'

import cookieParser from 'cookie-parser';
const app = express();


const isAuthenticated =(req,res,next)=>{
const {token} = req.cookies
if(token){
    next()
}else{

    res.render("login.ejs")
}
}

mongoose.connect("mongodb://127.0.0.1:27017",{dbName:"backend"}).then(()=>{
    console.log("database connected to localhost")
}).catch((e)=>{
    console.log(e)
}) 


const msgSchema = new mongoose.Schema({
    name:String,
    email:String
})

const Message  = mongoose.model("Message",msgSchema) 

// using middleware to read the form data
app.use(urlencoded({extended:true}))
app.use(express.static(path.join(path.resolve(),"public")))
app.use(cookieParser())


app.get('/getproducts',(req,res)=>{
res.render("index.ejs")

})

app.get('/login',isAuthenticated,(req,res,next)=>{
    res.render('logout.ejs')
})




app.post('/checklogin',(req,res)=>{
    
    const jwtTToken = "sdknasdnsansad"
    res.cookie("token",jwtTToken,{httpOnly:true,expires:new Date(Date.now()+ 1000*60)})
    res.redirect("/login")
    
})



app.get('/logout',(req,res)=>{
    res.cookie("token", null,{ httpOnly:true, expires:new Date(Date.now())})
   res.render('login.ejs')
})

app.get('/success',(req,res)=>{
    res.render('success.ejs')
})

app.get("/users",(req,res)=>{
    res.json({
        users
    })
})

app.post("/add", async(req,res)=>{
    const {name,email} = req.body
    await Message.create({name,email})
    res.redirect("/success")
})





app.listen(4000,(req,res)=>{
    console.log("server listening")  
    
})