import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Login(){
    const [form, setForm] = useState({username: '', password: ''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:3000/api/auth/login', form);
            localStorage.setItem('token', res.data.token);
            localStorage.setItem('user', JSON.stringify(res.data.user));
            navigate('/');
        } catch(error) {
            alert('Login failed');
            console.error(error.response?.data?.message || error.message);
        }
    };

    return(
        <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name='username' value={form.username} onChange={handleChange} placeholder='Username' required />
        <input type='password' name='password' value={form.password} onChange={handleChange} placeholder='Password' required />
        <button type='submit'>Login</button>
        </form>
    );
}