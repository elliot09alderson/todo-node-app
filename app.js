
import express,{urlencoded} from  'express'
export const app = express()
import { connectDb } from './db/database.js'
import { UserRouter } from './routes/userRoute.js'
import { config } from 'dotenv'
import { taskRouter } from './routes/taskRoute.js'
import { errorMiddleware } from './middleware/errorMiddleware.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'

config({
   path:"./env/config.env",
});
connectDb()
app.use(urlencoded({extended:true}))
// app.use(express.static(path.join(path.resolve(),"public")))
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin:[process.env.FRONTEND_URI],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

app.use('api/v1/user',UserRouter)
app.use('api/v1/task',taskRouter)



app.listen(4000,()=>{
    console.log(`server is listening on port : ${process.env.PORT} in ${process.env.NODE_ENV} mode`)
})
// # error handler function
app.use(errorMiddleware)

