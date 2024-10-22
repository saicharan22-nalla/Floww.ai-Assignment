const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./expense_tracker.db');

// Create the tables if they don't exist
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS categories (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            type TEXT NOT NULL CHECK(type IN ('income', 'expense'))
        );
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            type TEXT NOT NULL CHECK(type IN ('income', 'expense')),
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            description TEXT
        );
    `);
});

module.exports = db;
