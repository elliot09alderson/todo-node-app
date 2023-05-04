
import mongoose from "mongoose"
export const connectDb =()=>{

    mongoose.connect(process.env.MONGO_URI,{dbName:"backend_api"}).then((c)=>{
        console.log(`connected to database with ${c.connection.host}`)
    }).catch((e)=>{
        console.log(e)
    })
}

