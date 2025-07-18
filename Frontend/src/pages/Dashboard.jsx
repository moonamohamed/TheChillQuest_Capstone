import {useEffect, useState} from 'react';
import axios from 'axios';


export default function Dashboard() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(!token) return;
        const fetchUser = async () => {
            try{
                const res = await axios.get('http://localhost:5173/api/auth/me', {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setUser(res.data);
            } catch(error) {
                console.error(error);
            }
            };
            fetchUser();
        }, []);
        if(!user) return <p>Loading...</p>;

        return(
            <div>
                <h1>Welcome, {user.username}!</h1>
                <p>Level: {user.level}</p>
                <p>XP: {user.xp}</p>
            </div>
        );
    }
