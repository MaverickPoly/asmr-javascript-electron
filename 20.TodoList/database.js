const {Database} = require("sqlite3");
const path = require("node:path");

class TodoDatabase {
    constructor() {
        this.db = new Database(path.join(__dirname, "db.sqlite3"));
        this.db.run(`
            CREATE TABLE IF NOT EXISTS todos(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                completed INTEGER DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
        `)
    }

    addTodo(title, callback) {
        this.db.run(`
            INSERT INTO todos (title)
            VALUES (?)
        `, [title], (err) => {
            if (err) return callback(err);
            callback(null);
        })
    }

    getTodos(callback) {
        this.db.all(`SELECT * FROM todos ORDER BY created_at`, [], (err, rows) => {
            if (err) return callback(err);
            return callback(null, rows);
        });
    }

    deleteTodo(id, callback) {
        this.db.run(`
            DELETE FROM todos WHERE id = ?
        `, [id], (err) => {
            if (err) return callback(err);
            return callback(null);
        });
    }

    updateTodo(id, title, completed, callback) {
        return this.db.run(`
            UPDATE todos SET title = ?, completed = ? 
            WHERE id = ?
        `, [title, completed, id], (err) => {
            if (err) return callback(err);
            return callback(null)
        })
    }

    close() {
        this.db.close();
    }
}

module.exports = TodoDatabase;