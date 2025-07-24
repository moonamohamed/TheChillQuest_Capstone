import { useEffect, useState, useRef } from 'react'; //react hooks
import { useNavigate } from 'react-router-dom'; //navigation hook from react router
import confetti from 'canvas-confetti'; //animation library for celebratory effect


export default function Dashboard() {
    const [user, setUser] = useState(null); //state to store user data
    const navigate = useNavigate(); //allows navigation to other routes
    const prevLevelRef = useRef(null); //ref to track user's previous level (used for confetti trigger)


    useEffect(() => {
        const token = localStorage.getItem('token'); //get JWT token from localStorage
        if (!token) {
            navigate('/login'); //if token missing, redirect to login
            return;
        }
        //fetch user data
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/auth/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });

                //if token invalid or expired
                if (!res.ok) {
                    if (res.status === 401) { 
                        localStorage.removeItem('token');
                        navigate('/login')
                    }
                    throw new Error('Failed to fetch user');
                }

                const data = await res.json();
                //trigger confetti animation if user has leveled up
                // if (prevLevelRef.current !== null && data.level > prevLevelRef.current) {
                    // confetti();
                    //optional bounce animation if previous level ref is linked to an element
                    // if(prevLevelRef.current) {
                        // prevLevelRef.current.style.animation = 'bounce 1s ease';
                //         setTimeout(() => {
                //             prevLevelRef.current.style.animation = '';
                //         }, 1000);
                //     }
                // }
                //update ref with current level for future comparisons
                prevLevelRef.current = data.level;
                setUser(data); //store user data in state

            } catch (error) {
                //log error to console for debugging
                console.error('Fetch user error:', error.message);
            }
        };

        fetchUser(); //call fetchUser once on component mount
    }, [navigate]); //run when component mounts or navigate function changes
    //logout: clear token and redirect
    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    //show loading state if user is not yet loaded
    if (!user) {
        return (
            <div style={{ padding: '2rem', textAlign: 'center', background: '#f0f8ff', borderRadius: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', maxWidth: '400px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
                <p style={{ fontSize: '1.2rem' }}>Loading your profile...</p>
            </div>
        );
    }

    const xpToNextLevel = 100; //hardcoded XP required per level
    const xpPercent = Math.min((user.xp / xpToNextLevel) * 100, 100); //calculate percentage for XP bar

    return (
        <div style={{ padding: '2rem', textAlign: 'center', background: '#f0f8ff', borderRadius: '1rem', boxShadow: '0 4px 10px rgba(0,0,0,0.1)', maxWidth: '400px', margin: '2rem auto', fontFamily: 'sans-serif' }}>
           
            {/* app header bar */}
            <div style={{ background: '#3aafa9', color: '#fff', padding: '0.75rem', borderRadius: '0.5rem 0.5rem 0 0', marginBottom: '1rem' }} ></div>
            <h2 style={{ margin: 0 }}>🧙‍♂️ The Chill Quest</h2>
            {/* user avatar and welcome message */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1rem' }}>
                
                {/* dynamic avatar generated using DiceBear API with username as seed */}
                <img
                    src={`https://api.dicebear.com/7.x/pixel-art/svg?seed=${user.username}`}
                    alt="User Avatar"
                    style={{ width: '80px', height: '80px', borderRadius: '50%', marginBottom: '0.5rem' }} />

                {/* personalized greeting */}
                <h1 style={{ color: '#4a7c59' }}>🎮 Welcome back, {user.username}</h1>
                <p style={{ fontSize: '1.1rem', color: '#333', marginBottom: '1rem' }}>You're doing great! Let's keep questing 💪</p>
            </div>

            {/* level display (with optional bounce animation when levelin up) */}
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', animation: 'bounce 1s ease', display: 'inline-block' }}>Level: {user.level}</p>

            {/* XP counter showing user's current XP */}
            <p>XP: {user.xp}</p>

            {/* XP progress Bar */}
            <div style={{ marginTop: '1rem', width: '100%' }} >
                <p>XP Progress to Next Level:</p>
                {/* XP bar container */}
                <div style={{ background: '#e0e0e0', borderRadius: '10px', overflow: 'hidden', height: '20px', margin: '1rem auto', width: '80%', position: 'relative' }}>
                    {/* filled XP bar showing user's progress toward next level */}
                    <div style={{ width: `${xpPercent}%`, background: '#76c7c0', height: '100%', transition: 'width 0.5s ease-in-out', position: 'absolute', top: 0, left: 0 }} />
                </div>
                {/* numeric XP progress display */}
                <p>{user.xp} / {xpToNextLevel} XP</p>
            </div>

            {/* logout button to end session and clear token */}
            <button onClick={handleLogout} style={{ marginTop: '1rem', padding: '0.5rem 1rem', background: '#3aafa9', border: 'none', color: '#fff', borderRadius: '8px', cursor: 'pointer' }}>Logout</button>

        </div>
    );
}

