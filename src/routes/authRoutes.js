import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db.js';

const router =express.Router();

router.post('/register',(req,res) => {
    const { username, password } = req.body;//accessing the username and password from the request body
   //encrypting the password
   const hashedPassword= bcrypt.hashSync(password,8);//8 is the salt rounds

   //saving new user and hashed password to the database
    try{
        const insertuser =db.prepare(`INSERT INTO users(UserName,Password) values(?,?)`);
        const result = insertuser.run(username,hashedPassword);//storing hashed and new username

        //assiging the default todo for user
        const defaultTodo =`Hello :) Add your first todo!`;
        const insertTodo = db.prepare(`INSERT INTO todos(UserId,task) values(?,?)`);
        insertTodo.run(result.lastInsertRowid, defaultTodo);

        //creating a token for the user
        const token=jwt.sign({id: result.lastInsertRowid},process.env.JWT_secret,{expiresIn : `24h`})
        res.json({token});
    }catch(error){
        console.log(error.message);
        res.sendStatus(500);
    }


})
router.post('/login',(req,res) => {
    
})

export default router;
