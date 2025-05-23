const path = require("path");

const { Database} = require("sqlite3");


class NotesDatabase{
    constructor() {
        this.db = new Database(path.join(__dirname, "db.sqlite3"));
        this.db.run(`
            CREATE TABLE IF NOT EXISTS notes(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
        `)
    }

    addNote(title, callback) {
        this.db.run(`
            INSERT INTO notes (title)
            VALUES (?) 
        `, [title], (err) => {
                if (err) return callback(err);
                callback(null, {success: true});
        });
    }

    getNotes(callback) {
        this.db.all(`SELECT * FROM notes ORDER BY created_at`, [],(err, rows) => {
            if (err) return callback(err);
            return callback(null, {success: true, rows})
        });
    }

    deleteNote(id, callback) {
        this.db.run(`
            DELETE FROM notes WHERE id = ?
        `, [id], (err) => {
            if (err) return callback(err);
            return callback(null, {success: true});
        });
    }

    updateNote(id, title, callback) {
        return this.db.run(`
            UPDATE notes SET title = ? WHERE id = ? 
        `, [title, id], (err) => {
            if (err) return callback(err);
            return callback(null, {success: true});
        });
    }

    close() {
        this.db.close();
    }
}

module.exports = NotesDatabase