import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <nav style={{display: 'flex', gap: '1rem', padding: '1rem'}}>
            {token ? (
            <>
            <Link to='/'>Dashboard</Link>
            <Link to='/quests'>Quests</Link>
            <button onClick={logout}>Logout</button>
            </>
            ) : (
            <>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            </>
            )}
        </nav >
    );
}