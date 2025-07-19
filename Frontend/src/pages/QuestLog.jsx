import { useEffect, useState } from "react";
import axios from 'axios';

export default function QuestLog() {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);


    const token = localStorage.getItem('token');
    const userId = JSON.parse(atob(token.split('.')[1])).id;

    useEffect(() => {
        const fetchData = async () => {
            const taskRes = await axios.get(`http://localhost:3000/api/tasks/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTasks(taskRes.data);

            const userRes = await axios.get(`http://localhost:3000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setXp(userRes.data.xp);
            setLevel(userRes.data.level);
        };
        fetchData();
    }, []);

    const toggleComplete = async (id, currentStatus) => {
        await axios.patch(`http://localhost:3000/api/tasks/${id}`, {
            completed: !currentStatus
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });

        const updatedTasks = tasks.map(t =>
            t._id === id ? { ...t, completed: !currentStatus } : t
        );
        setTasks(updatedTasks);

        const userRes = await axios.get(`http://localhost:3000/api/users/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setXp(userRes.data.xp);
        setLevel(userRes.data.level);
    };

    const addTask = async (e) => {
        e.preventDefault();
        const res = await axios.post(`http://localhost:3000/api/tasks`, {
            title: newTitle,
            userId
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks([...tasks, res.data]);
        setNewTitle('');
    };

    const deleteTask = async (id) => {
        await axios.delete(`http://localhost:3000/api/tasks/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        setTasks(tasks.filter(task => task._id !== id));
    };

    return (
        <div>
            <h2>Your Quests</h2>
            <p>Level: {level} | XP: {xp}</p>

            <form onSubmit={addTask}>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                    placeholder='New quest...' required />
                <button type='submit'>Add Quest</button>
            </form>
    
            {tasks.map(task => (
                <div key={task._id}>
                    <h4>{task.title}</h4>
                    <p>Status: {task.completed ? 'Done' : 'Pending'}</p>
                    <input type='checkbox' checked={task.completed} onChange={() => toggleComplete(task._id, task.completed)} />
                    <button onClick={() => deleteTask(task._id)}>Delete</button>
                </div>
            ))}
        </div>
    );
}
