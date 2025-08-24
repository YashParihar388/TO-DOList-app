import { DatabaseSync } from 'node:sqlite'
<<<<<<< HEAD
const db = new DatabaseSync('database.db');

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
=======
<<<<<<< HEAD
const db = new DatabaseSync('database.db');

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE IF NOT EXISTS users (
=======
const db = new DatabaseSync(':memory:')

// Execute SQL statements from strings
db.exec(`
    CREATE TABLE users (
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c
>>>>>>> 36c03da279efe3eafd799ca433ddc2a8f9ab12b2
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE,
        password TEXT
    )
`)

db.exec(`
<<<<<<< HEAD
    CREATE TABLE IF NOT EXISTS todos (
=======
<<<<<<< HEAD
    CREATE TABLE IF NOT EXISTS todos (
=======
    CREATE TABLE todos (
>>>>>>> e842a4b8d9d05fbfd328276a9e46ccc54fe1864c
>>>>>>> 36c03da279efe3eafd799ca433ddc2a8f9ab12b2
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        task TEXT,
        completed BOOLEAN DEFAULT 0,
        FOREIGN KEY(user_id) REFERENCES users(id)
    )    
`)

export default db