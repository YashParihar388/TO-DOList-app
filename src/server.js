import express from 'express';
import path,{ dirname } from 'path';
import { fileURLToPath } from 'url';



const app=express();//create an express application
//set the port to an environment variable or default to 5000
//this allows the app to run on different ports in different environments   
const port= process.env.PORT || 5000;

//get the file path from url 
const __filename = fileURLToPath(import.meta.url);
//get directory name 
const __dirname = dirname(__filename);

//middleware to parse JSON bodies
app.use(express.static(path.join(__dirname,'../public')))//../ means go one level up from src to chapter_3

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname,'public', 'index.html'));//to fetch the index.html file from public folder
})


app.listen(port,() => {
    console.log(`server has started on ${port}`)
})