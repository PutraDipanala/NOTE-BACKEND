const db = require('../config/Database');

// Fungsi untuk membuat catatan baru
const createNote = (title, datetime, note, callback) => {
    const query = "INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)";
    db.query(query, [title, datetime, note], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Fungsi untuk mengambil semua catatan
const getAllNotes = (callback) => {
    const query = "SELECT * FROM notes";
    db.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Fungsi untuk mengambil catatan berdasarkan ID
const getNoteById = (id, callback) => {
    const query = "SELECT * FROM notes WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Fungsi untuk memperbarui catatan
const updateNote = (id, title, datetime, note, callback) => {
    const query = "UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?";
    db.query(query, [title, datetime, note, id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

// Fungsi untuk menghapus catatan
const deleteNote = (id, callback) => {
    const query = "DELETE FROM notes WHERE id = ?";
    db.query(query, [id], (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote };
