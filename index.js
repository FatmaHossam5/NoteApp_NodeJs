import express from "express";
import dotenv from 'dotenv';
import {appRouter} from "./modules/index.router.js"
dotenv.config()

const app = express()
appRouter(app)



app.listen(port,()=>console.log(`Server is Running on port ${port}`))
