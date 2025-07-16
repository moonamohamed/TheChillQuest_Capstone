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
            const res = await axios.post('http://localhost:5000/api/auth/login', form);
            localStorage.setItem('token', res.data.token);
            navigate('/');
        } catch(error) {
            alert('Login failed');
        }
    };

    return(
        <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input name='username' onChange={handleChange} placeholder='Username' required />
        <input type='password' onChange={handleChange} placeholder='Password' required />
        <button type='submit'>Login</button>
        </form>
    );
}