import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuestLog() {
    const [tasks, setTasks] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [loading, setLoading] = useState(true);
    const [userId, setUserId] = useState(null);

    
    const token = localStorage.getItem('token');
    const navigate = useNavigate();


    useEffect(() => {   
    if (!token) {
        console.error('Token missing');
        navigate('/login');
        return;
    }

    try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isExpired = payload.exp * 1000 < Date.now();
        if (isExpired) {
            console.error('Token expired');
            localStorage.removeItem('token');
            navigate('/login');
            return ;
        }
        setUserId(payload.id);
    } catch (error) {
        console.error('Invalid token format');
        navigate('/login');  
    }
}, [token, navigate]);

    useEffect(() => {
        if(!userId) return;
        const fetchData = async () => {
            try {
                const taskRes = await fetch(`http://localhost:3000/api/tasks/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (!taskRes.ok) throw new Error('Failed to fetch tasks');
                const taskData = await taskRes.json();
                setTasks(taskData);

                const userRes = await fetch(`http://localhost:3000/api/users/${userId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (!userRes.ok) throw new Error('Failed to fetch user data');
                const userData = await userRes.json();
                setXp(userData.xp);
                setLevel(userData.level);
            } catch (error) {
                console.error('Fetch error:', error.message)
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [token, userId]);

    const toggleComplete = async (id, currentStatus) => {
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ completed: !currentStatus })
            });

            if (!res.ok) throw new Error('Failed to update task');

            setTasks(prevTasks =>
                prevTasks.map(task =>
                    task._id === id ? { ...task, completed: !currentStatus } : task
                )
            );

            const userRes = await fetch(`http://localhost:3000/api/users/${userId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!userRes.ok) throw new Error('Failed to fetch updated user data');
            const userData = await userRes.json();
            setXp(userData.xp);
            setLevel(userData.level);
        } catch (error) {
            console.error('Toggle error:', error.message);
        }
    };

    const addTask = async (e) => {
        e.preventDefault();
        const trimmedTitle = newTitle.trim();
        if(!trimmedTitle) return;

        try {
            const res = await fetch(`http://localhost:3000/api/tasks`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ text: newTitle })
            });

            if (!res.ok) throw new Error('Failed to add task');
            const data = await res.json();
            setTasks([...tasks, data]);
            setNewTitle('');
        } catch (error) {
            console.error('Error adding task:', error.message);
            alert('Add task error:', error.message);
        }
    };

    const deleteTask = async (id) => {
        try {
            const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
                method: 'DELETE',
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error('Failed to delete task');

            setTasks(tasks.filter(task => task._id !== id));
        } catch (error) {
            console.error('Delete error:', error.message);
        }
    };

    if(loading) return <p style={{textAlign: 'center'}}>Loading your quests...</p>

    return (
        <div style={{padding: '1rem'}}>
            <h2>Your Quests</h2>
            <p>Level: {level} | XP: {xp}</p>
            <div style={{background: '#ddd', height: '10px', width: '100%', marginBottom: '1rem'}}>
                <div style={{background: 'limegreen', height: '100%', width: `${(xp % 100)}%`, transition: 'width 0.3s ease'}}></div>
            </div>

            <form onSubmit={addTask}>
                <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)}
                    placeholder='New quest...' required />
                <button type='submit'>Add Quest</button>
            </form>

            {tasks.length === 0 ? (
                <p>No quests yet. Start your journey by adding one!</p>
            ) : (
            tasks.map(task => (
            <div key={task._id}>
                <h4>{task.text}</h4>
                <p>Status: {task.completed ? 'Done' : 'Pending'}</p>
                <input type='checkbox' checked={task.completed} onChange={() => toggleComplete(task._id, task.completed)} />
                <button onClick={() => deleteTask(task._id)}>Delete</button>
            </div>
            ))
        )}
        </div>
    );
}
