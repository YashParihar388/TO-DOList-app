import express from 'express'
<<<<<<< HEAD
import prisma from '../prismaClient.js'
=======
import db from '../db.js'
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c

const router = express.Router()

// Get all todos for logged-in user
<<<<<<< HEAD
router.get('/', async (req, res) => {
    const todos = await prisma.todo.findMany({
        where: {
            userId: req.userId
        }
    })

=======
router.get('/', (req, res) => {
    const getTodos = db.prepare('SELECT * FROM todos WHERE user_id = ?')
    const todos = getTodos.all(req.userId)
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c
    res.json(todos)
})

// Create a new todo
<<<<<<< HEAD
router.post('/', async (req, res) => {
    const { task } = req.body

    const todo = await prisma.todo.create({
        data: {
            task,
            userId: req.userId
        }
    })

    res.json(todo)
})

// Update a todo
router.put('/:id', async (req, res) => {
    const { completed } = req.body
    const { id } = req.params

    const updatedTodo = await prisma.todo.update({
        where: {
            id: parseInt(id),
            userId: req.userId
        },
        data: {
            completed: !!completed
        }
    })
    res.json(updatedTodo)
})

// Delete a todo
router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const userId = req.userId
    await prisma.todo.delete({
        where: {
            id: parseInt(id),
            userId
        }
    })

=======
router.post('/', (req, res) => {
    const { task } = req.body
    const insertTodo = db.prepare(`INSERT INTO todos (user_id, task) VALUES (?, ?)`)
    const result = insertTodo.run(req.userId, task)

    res.json({ id: result.lastInsertRowid, task, completed: 0 })
})

// Update a todo
router.put('/:id', (req, res) => {
    const { completed } = req.body
    const { id } = req.params
    const { page } = req.query

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    updatedTodo.run(completed, id)

    res.json({ message: "Todo completed" })
})

// Delete a todo
router.delete('/:id', (req, res) => {
    const { id } = req.params
    const userId = req.userId
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deleteTodo.run(id, userId)
    
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c
    res.send({ message: "Todo deleted" })
})

export default router