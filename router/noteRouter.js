//noteRouter.js
const express = require('express');
const router = express.Router();
const noteController = require('../controllers/noteController');

// Endpoint untuk membuat catatan baru
router.post('/notes', noteController.createNote);

// Endpoint untuk mendapatkan semua catatan
router.get('/notes', noteController.getAllNotes);

// Endpoint untuk mendapatkan catatan berdasarkan ID
router.get('/notes/:id', noteController.getNoteById);

// Endpoint untuk memperbarui catatan
router.put('/notes/:id', noteController.updateNote);

// Endpoint untuk menghapus catatan
router.delete('/notes/:id', noteController.deleteNote);

module.exports = router;