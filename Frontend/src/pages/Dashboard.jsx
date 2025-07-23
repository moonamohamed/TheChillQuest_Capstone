import {useEffect, useState} from 'react';
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
                const res = await fetch('http://localhost:3000/api/auth/me', {
                    headers: {Authorization: `Bearer ${token}`},
                });

                if(!res.ok) {
                    if(res.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login')
                }
                throw new Error('Failed to fetch user');
            }

            const data = await res.json();
                setUser(data);
                
            } catch(error) {
                console.error('Fetch user error:', error.message);
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

