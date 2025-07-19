import {useEffect, useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) {
            navigate('/login');
            return;
        }
        const fetchUser = async () => {
            try{
                const res = await axios.get('http://localhost:3000/api/auth/me', {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setUser(res.data);
                
            } catch(error) {
                console.error(error);
                if(error.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            }
        };
            fetchUser();
        }, [navigate]);

        const handleLogout = () => {
            localStorage.removeItem('token');
            navigate('/login');
        };

        if(!user) return <p>Loading...</p>;

        return(
            <div>
                <h1>Welcome, {user.username}!</h1>
                <p>Level: {user.level}</p>
                <p>XP: {user.xp}</p>

                <button onClick={handleLogout} style={{marginTop: '1rem'}}>Logout</button>
            </div>
        );
}

