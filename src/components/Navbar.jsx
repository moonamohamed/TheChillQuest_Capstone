import {link, useNavigate} from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return(
        <nav>
            <link to='/'>Dashboard</link>
            <link to='/quests'>Quests</link>
            <link to='/login'>Login</link>
            <link to='/register'>Register</link>
            <button onClick={logout}>Logout</button>
        </nav>
    );
}