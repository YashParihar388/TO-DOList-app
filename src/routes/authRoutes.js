import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
<<<<<<< HEAD

import prisma from '../prismaclient.js'
=======
import db from '../db.js'
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c

const router = express.Router()

// Register a new user endpoing /auth/register
<<<<<<< HEAD
router.post('/register', async(req, res) => {
=======
router.post('/register', (req, res) => {
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c
    const { username, password } = req.body
    // save the username and an irreversibly encrypted password
    // save gilgamesh@gmail.com | aklsdjfasdf.asdf..qwe..q.we...qwe.qw.easd

    // encrypt the password
    const hashedPassword = bcrypt.hashSync(password, 8)

    // save the new user and hashed password to the db
    try {
<<<<<<< HEAD
        const user = await prisma.user.create({
            data : {
                username,
                password:hashedPassword
            }
        })
        // now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) Add your first todo!`

        await prisma.todo.create({
            data : {
                userId: user.id,
                task: defaultTodo
               
            }
        })
        
=======
        const insertUser = db.prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
        const result = insertUser.run(username, hashedPassword)

        // now that we have a user, I want to add their first todo for them
        const defaultTodo = `Hello :) Add your first todo!`
        const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
        insertTodo.run(result.lastInsertRowid, defaultTodo)

>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c
        // create a token
        const token = jwt.sign({ id: result.lastInsertRowid }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }
})

<<<<<<< HEAD
router.post('/login', async(req, res) => {
=======
router.post('/login', (req, res) => {
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c
    // we get their email, and we look up the password associated with that email in the database
    // but we get it back and see it's encrypted, which means that we cannot compare it to the one the user just used trying to login
    // so what we can to do, is again, one way encrypt the password the user just entered

    const { username, password } = req.body

    try {
<<<<<<< HEAD
         const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        })
       
=======
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c

        // if we cannot find a user associated with that username, return out from the function
        if (!user) { return res.status(404).send({ message: "User not found" }) }

        const passwordIsValid = bcrypt.compareSync(password, user.password)
        // if the password does not match, return out of the function
        if (!passwordIsValid) { return res.status(401).send({ message: "Invalid password" }) }
        console.log(user)

        // then we have a successful authentication
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' })
        res.json({ token })
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503)
    }

})


export default router