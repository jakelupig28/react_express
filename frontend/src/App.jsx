import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/course";

function App() {
    const [schedules, setSchedules] = useState([]);
    const [subject, setSubject] = useState("");
    const [day, setDay] = useState("");
    const [time, setTime] = useState("");
    const [room, setRoom] = useState("");

    useEffect(() => {
        fetchSchedules();
    }, []);

    const fetchSchedules = async () => {
        try {
            const res = await axios.get(API_URL);
            setSchedules(res.data);
        } catch (error) {
            console.error("Error fetching schedules:", error);
        }
    };

    const addSchedule = async () => {
        if (!subject || !day || !time || !room) {
            alert("All fields are required!");
            return;
        }
        try {
            const res = await axios.post(API_URL, { subject, day, time, room });
            
            setSubject("");
            setDay("");
            setTime("");
            setRoom("");
        } catch (error) {
            console.error("Error adding schedule:", error);
            alert("Failed to add schedule!");
        }
    };

    const deleteSchedule = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setSchedules(schedules.filter((schedule) => schedule.id !== id));
        } catch (error) {
            console.error("Error deleting schedule:", error);
        }
    };

    return (
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>React + Express REST API</h1>
            <div>
                <input placeholder="Subject" value={subject} onChange={(e) => setSubject(e.target.value)} />
                <input placeholder="Day" value={day} onChange={(e) => setDay(e.target.value)} />
                <input placeholder="Time" value={time} onChange={(e) => setTime(e.target.value)} />
                <input placeholder="Room" value={room} onChange={(e) => setRoom(e.target.value)} />
                <button onClick={addSchedule}>Add Item</button>
            </div>
            <table border="1" style={{ margin: "20px auto", width: "80%" }}>
                <thead>
                    <tr>
                        <th>Subject</th>
                        <th>Day</th>
                        <th>Time</th>
                        <th>Room</th>
                    </tr>
                </thead>
                <tbody>
                    {schedules.map((schedule) => (
                        <tr key={schedule.id}>
                            <td>{schedule.subject}</td>
                            <td>{schedule.day}</td>
                            <td>{schedule.time}</td>
                            <td>{schedule.room}</td>
                            <td>
                                <button onClick={() => deleteSchedule(schedule.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;