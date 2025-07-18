import { useState } from 'react';
import axios from 'axios';
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
            await axios.post('http://localhost:3000/api/auth/register', form);
            navigate('/login');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="username" onChange={handleChange} placeholder='Username' required />
            <input type="password" name='password' onChange={handleChange} placeholder='Password' required />
            <input type='email' name='email' onChange={handleChange} placeholder='Email' required />
            <button type='Submit'>Register</button>
        </form>
    );
}