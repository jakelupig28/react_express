require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "react_db"
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err);
        return;
    }
    console.log('Connected to MySQL');
});

// Get all schedules
app.get('/schedules', (req, res) => {
    db.query('SELECT * FROM schedule', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});

// Add new schedule
app.post('/schedules', (req, res) => {
    const { subject, day, time, room } = req.body;
    db.query(
        'INSERT INTO schedule (subject, day, time, room) VALUES (?, ?, ?, ?)',
        [subject, day, time, room],
        (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.json({ id: result.insertId, subject, day, time, room });
        }
    );
});

// Delete a schedule
app.delete('/schedules/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM schedule WHERE id = ?', [id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Deleted successfully' });
    });
});

const PORT = 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));