import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Registration failed')
            }

            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error.message);
            alert(error.message || 'Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="username" onChange={handleChange} placeholder='Username' required />
            <input type="password" name='password' onChange={handleChange} placeholder='Password' required />
            <input type='email' name='email' onChange={handleChange} placeholder='Email' required />
            <button type='submit'>Register</button>
        </form>
    );
}