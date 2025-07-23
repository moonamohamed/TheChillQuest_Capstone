import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login Failed');
            }

            const data = await res.json();
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (error) {
            setError(error.message || 'Login failed');
            console.error('Login error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            <input name='username' value={form.username} onChange={handleChange} placeholder='Username' required />
            <input type='password' name='password' value={form.password} onChange={handleChange} placeholder='Password' required autoComplete='current-password' />
            <button type='submit' disabled={loading}>{loading ? 'Logging in' : 'Login'}</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
}