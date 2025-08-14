import express from 'express';
import db from '../db.js';

const router = express.Router();

// to get all todos
router.get('/', (req, res) => {
    // Add your logic here
});

// to create a new todo
router.post('/', (req, res) => {
    // Add your logic here
});

// to update a todo
router.put('/:id', (req, res) => {
    // Add your logic here
});

// to delete a todo
router.delete('/:id', (req, res) => {
    // Add your logic here
});

export default router;