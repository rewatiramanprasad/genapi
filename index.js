const environment = process.env.NODE_ENV || 'development';
import dotenv from 'dotenv' ;
dotenv.config({ path: `.env.${environment}` });
import cors from 'cors';
import { gemini,geminiSuggestion } from './controller.js';
// import {app,express}from "./app.js";
import  express from 'express';
const app=express();
app.use(express.json());
// app.use(cors());
app.use(cors())

const apiValidation=async(req,res,next)=>{
    const {prompt}=req.body;
    console.log(req.body)
    if(prompt===""||prompt ==undefined){
        await res.status(400).send({success:false,data:[],message:"invalidInput:prompt is required"}).end();
    }else{
        await next();
    }
}
app.get('/hello',(req,res)=>{
    res.status(200).send({success:true,data:[],message:"hello world"}).end();
      
})
app.post("/gemini/api",apiValidation,async(req,res,next)=>{
    const {prompt}=req.body;
    console.log("helloq")
    const response=await gemini(prompt)
if(response){
    res.status(200).send({success:true,data:response,message:"data Fetched from gemini"}).end();
}else{
res.status(400).send({success:false,data:response,message:"data not able to Fetched from gemini"}).end();
}
})

app.post("/gemini/suggestion",apiValidation,async(req,res)=>{
    const {prompt}=req.body;
    console.log("helloq")
    const response=await geminiSuggestion(prompt)
    if(response){
        res.status(200).send({success:true,data:response,message:"data Fetched from gemini"}).end();
    }else{
    res.status(400).send({success:false,data:response,message:"data not able to Fetched from gemini"}).end();
    }
})


export {app}






app.listen(process.env.PORT,()=>console.log(`listen to server ...... http://localhost:${process.env.PORT}`));

