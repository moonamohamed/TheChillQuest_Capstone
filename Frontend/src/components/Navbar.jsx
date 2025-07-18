import {Link, useNavigate} from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return(
        <nav>
            <Link to='/'>Dashboard</Link>
            <Link to='/quests'>Quests</Link>
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
            <button onClick={logout}>Logout</button>
        </nav>
    );
}