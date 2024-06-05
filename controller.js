const environment = process.env.NODE_ENV || 'development';
import dotenv from 'dotenv' ;
dotenv.config({ path: `.env.${environment}` });
import  { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
console.log(typeof process.env.API_KEY)
const  gemini=async(prompt)=> {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return text;
  }

  const  geminiSuggestion=async(prompt)=> {
    // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    const query=`please provide answer in one array of string the suggested prompt must be shorter and atleast 5 of similar given prompt "${prompt}"`
    console.log(query)
    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();
    console.log(text)
    return text;
  }

  export {gemini,geminiSuggestion}