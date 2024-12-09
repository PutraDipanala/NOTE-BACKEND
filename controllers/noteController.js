//noteController.js
const Note = require('../models/noteModel');

// Membuat catatan baru
const createNote = (req, res) => {
    const { title, datetime, note } = req.body;
    Note.createNote(title, datetime, note, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error creating note', error: err });
        } else {
            res.status(201).json({ message: 'Note created successfully', data: results });
        }
    });
};

// Menampilkan semua catatan
const getAllNotes = (req, res) => {
    Note.getAllNotes((err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching notes', error: err });
        } else {
            res.status(200).json({ data: results });
        }
    });
};

// Menampilkan catatan berdasarkan ID
const getNoteById = (req, res) => {
    const { id } = req.params;
    Note.getNoteById(id, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error fetching note', error: err });
        } else if (results.length === 0) {
            res.status(404).json({ message: 'Note not found' });
        } else {
            res.status(200).json({ data: results[0] });
        }
    });
};

// Memperbarui catatan
const updateNote = (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    Note.updateNote(id, title, datetime, note, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error updating note', error: err });
        } else {
            res.status(200).json({ message: 'Note updated successfully', data: results });
        }
    });
};

// Menghapus catatan
const deleteNote = (req, res) => {
    const { id } = req.params;
    Note.deleteNote(id, (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Error deleting note', error: err });
        } else {
            res.status(200).json({ message: 'Note deleted successfully' });
        }
    });
};

module.exports = { createNote, getAllNotes, getNoteById, updateNote, deleteNote };