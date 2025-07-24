//react imports for state management and navigation
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//functional component for the login page
export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' }); //state for form fields 
    const [error, setError] = useState(''); //state for error message display
    const [loading, setLoading] = useState(false); //state to show loading feedback during login
    const navigate = useNavigate(); //react router hook to navigate after login success

    //updates form state as user types into input fields
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //handles form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevent default form refresh
        setError(''); //clear previous error (if any)
        setLoading(true); //show loading indicator
        try { //send login request to backend
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) { //handles failed login (invalid credentials, server error)
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login Failed');
            }

            //parse response and save token + user to localStorage
            const data = await res.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/'); //navigates to dashboard after successful login
        } catch (error) { //show error message to user if something went wrong
            setError(error.message || 'Login failed');
            console.error('Login error:', error.message);
        } finally { //stop loading state regardless of success/failure
            setLoading(false);
        }
    };

    //render login form jsx
    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name='username' value={form.username} onChange={handleChange} placeholder='Username' required /> {/* username input */}
            <input type='password' name='password' value={form.password} onChange={handleChange} placeholder='Password' required autoComplete='current-password' /> {/* password input */}
            <button type='submit' disabled={loading}>{loading ? 'Logging in' : 'Login'}</button> {/* submit button */}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}