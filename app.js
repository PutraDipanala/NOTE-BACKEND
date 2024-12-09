require('dotenv').config();  // Memuat konfigurasi dari file .env
const express = require('express');
const app = express();
const connection = require('./config/Database'); // Mengimpor koneksi database

// Middleware untuk parsing JSON (tanpa body-parser karena sudah built-in di Express)
app.use(express.json());

// CREATE: Menambahkan note baru
app.post('/notes', (req, res) => {
    const { title, datetime, note } = req.body;
    
    // SQL query untuk menambah data note
    const query = 'INSERT INTO notes (title, datetime, note) VALUES (?, ?, ?)';
    
    connection.query(query, [title, datetime, note], (err, result) => {
        if (err) {
            console.error('Error inserting note:', err);
            return res.status(500).json({ message: 'Failed to add note' });
        }
        res.status(201).json({ message: 'Note added successfully', id: result.insertId });
    });
});

// READ: Menampilkan semua notes
app.get('/notes', (req, res) => {
    // SQL query untuk mengambil semua data notes
    const query = 'SELECT * FROM notes';
    
    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error fetching notes:', err);
            return res.status(500).json({ message: 'Failed to fetch notes' });
        }
        res.status(200).json(results);
    });
});

// READ: Menampilkan satu note berdasarkan ID
app.get('/notes/:id', (req, res) => {
    const { id } = req.params;
    
    // SQL query untuk mengambil satu note berdasarkan ID
    const query = 'SELECT * FROM notes WHERE id = ?';
    
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error fetching note:', err);
            return res.status(500).json({ message: 'Failed to fetch note' });
        }
        if (result.length === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(result[0]);
    });
});

// UPDATE: Mengubah note berdasarkan ID
app.put('/notes/:id', (req, res) => {
    const { id } = req.params;
    const { title, datetime, note } = req.body;
    
    // SQL query untuk mengupdate note berdasarkan ID
    const query = 'UPDATE notes SET title = ?, datetime = ?, note = ? WHERE id = ?';
    
    connection.query(query, [title, datetime, note, id], (err, result) => {
        if (err) {
            console.error('Error updating note:', err);
            return res.status(500).json({ message: 'Failed to update note' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note updated successfully' });
    });
});

// DELETE: Menghapus note berdasarkan ID
app.delete('/notes/:id', (req, res) => {
    const { id } = req.params;
    
    // SQL query untuk menghapus note berdasarkan ID
    const query = 'DELETE FROM notes WHERE id = ?';
    
    connection.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error deleting note:', err);
            return res.status(500).json({ message: 'Failed to delete note' });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    });
});

// Menjalankan server
const PORT = process.env.APP_PORT || 3000; // Gunakan port dari .env atau default ke 3000
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
