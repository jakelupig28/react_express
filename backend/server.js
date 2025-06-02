const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
const PORT = 5000;


app.use(cors());
app.use(express.json());

// MySQL Database
const db = mysql.createConnection({
    host: "localhost",
    user: "root",  
    password: "",  
    database: "myreact_db",
    port: "4306"
});

db.connect(err => {
    if (err) {
        console.error("Database connection failed: ", err);
        return;
    }
    console.log("Connected to MySQL database.");
});


// GET
app.get("/course", (req, res) => {
    db.query("SELECT * FROM schedules", (err, results) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(results);
    });
});

// POST or ADD
app.post("/course", (req, res) => {
    const { subject, day, time, room } = req.body;
    if (!subject || !day || !time || !room) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const sql = "INSERT INTO schedules (subject, day, time, room) VALUES (?, ?, ?, ?)";
    db.query(sql, [subject, day, time, room], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ id: result.insertId, subject, day, time, room });
    });
});

// DELETE
app.delete("/course/:id", (req, res) => {
    const { id } = req.params;
    db.query("DELETE FROM schedules WHERE id = ?", [id], (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ message: "Schedule deleted successfully" });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});