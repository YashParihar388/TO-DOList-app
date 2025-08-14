import { DatabaseSync } from 'node:sqlite';
const db=new DatabaseSync(':memory:'); // Use an in-memory database for testing

db.exec(`
    CREATE TABLE users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        UserName TEXT UNIQUE ,
        Password TEXT
        )`
    );

db.exec(`
    CREATE TABLE todos(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    UserId INTEGER,
    task TEXT,
    Completed BOOLEAN DEFAULT 0,
    FOREIGN KEY(UserId) REFERENCES users(id)
    )`
);

export default db;

