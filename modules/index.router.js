
import noteRouter from './note/note.router.js';
import authRouter from './auth/auth.router.js';
import  express  from 'express';
import cors from 'cors'
import connectDB from '../DB/connection.js'
import { globalErrorHandling } from '../services/errorHandling.js';



export const appRouter =(app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors({}))
    const baseUrl ='/api/v1'
    app.use(`${baseUrl}/auth`,authRouter)
app.use(`${baseUrl}/note`,noteRouter)
app.use("*",(req,res)=>{
    res.json({message:"In-valid Routing"})
})
globalErrorHandling()
connectDB()
}
