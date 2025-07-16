import {useEffect, useState} from "react";
import axios from 'axios';

export default function QuestLog() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userId = JSON.parse(atob(token.split('.')[1])).id;
        const fetchTasks = async () => {
            const res = await axios.get(`http://localhost:5173/api/tasks/${userId}`);
            setTasks(res.data);
        };
        fetchTasks();
    }, []);

    return(
        <div>
            <h2>Your Quests</h2>
            {tasks.map(task => (
                <div key={task._id}>
                    <h4>{task.title}</h4>
                    <p>Status: {task.completed ? 'Done' : 'Pending'}</p>
                </div>
            ))}
        </div>
    );
}