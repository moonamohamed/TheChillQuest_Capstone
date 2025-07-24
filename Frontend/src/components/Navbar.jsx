//import link and useNavigate from react router for navigation
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() { //navbar component to show navigation links depending on login status
    const navigate = useNavigate();
    const token = localStorage.getItem('token')

    const logout = () => { //logout function removes token and user data, then redirects to login page
        localStorage.removeItem('token');//clear auth token
        localStorage.removeItem('user'); //clear user data
        navigate('/login'); //redirect to login
    };

    return (
        <nav className='navbar'>
            {token ? ( //if token exist(user is logged in), show dashboard/questlog links
            <>
            <Link to='/'>Dashboard</Link> {/* link to dashboard */}
            <Link to='/questlog'>QuestLog</Link> {/* link to quest log page */}
            <button className='nav-button' onClick={logout}>Logout</button> {/* logout button */}
            </>
            ) : (
            <>
            <Link className='nav-link' to='/login'>Login</Link> {/* link to login */}
            <Link className='nav-link' to='/register'>Register</Link> {/* link to register */}
            </>
            )}
        </nav >
    );
}