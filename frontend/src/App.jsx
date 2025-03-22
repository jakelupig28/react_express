import { useEffect, useState } from "react";
import axios from "axios";

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
        const res = await axios.get("http://localhost:5000/schedules");
        setSchedules(res.data);
    };

    const addSchedule = async () => {
        if (!subject || !day || !time || !room) return alert("All fields required!");
        await axios.post("http://localhost:5000/schedules", { subject, day, time, room });
        setSubject("");
        setDay("");
        setTime("");
        setRoom("");
        fetchSchedules();
    };

    const deleteSchedule = async (id) => {
        await axios.delete(`http://localhost:5000/schedules/${id}`);
        fetchSchedules();
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
                            <td><button onClick={() => deleteSchedule(schedule.id)}>Delete</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default App;