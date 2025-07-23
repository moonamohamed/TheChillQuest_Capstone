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
        <nav className='navbar'>
            {token ? (
            <>
            <Link to='/'>Dashboard</Link>
            <Link to='/questlog'>QuestLog</Link>
            <button className='nav-button' onClick={logout}>Logout</button>
            </>
            ) : (
            <>
            <Link className='nav-link' to='/login'>Login</Link>
            <Link className='nav-link' to='/register'>Register</Link>
            </>
            )}
        </nav >
    );
}