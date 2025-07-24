//import react's useState for form state nd useNavigate to redirect after registratio
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


//functional component for the registration page
export default function Register() {
    //local state to hold form input values
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const navigate = useNavigate(); //react router hook to navigate progammatically after success

    //handles input changes and updates the form state dynamically
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //handles form submission and sends registration data to backend
    const handleSubmit = async (e) => {
        e.preventDefault(); //prevents default form reload behavior
        try {
            //sends POST request to backend register endpoint
            const res = await fetch('http://localhost:3000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(form)
            });

            //handles registration fails errors
            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Registration failed')
            }

            navigate('/login'); //redirects to login page if successful
        } catch (error) {
            console.error('Registration error:', error.message); //catch and display errors to user
            alert(error.message || 'Registration failed');
        }
    };

    //jsx returned to render the registration form
    return (
        <form onSubmit={handleSubmit}>
            <h2>Register</h2>
            <input name="username" onChange={handleChange} placeholder='Username' required /> {/* username input */}
            <input type="password" name='password' onChange={handleChange} placeholder='Password' required /> {/* password input */}
            <input type='email' name='email' onChange={handleChange} placeholder='Email' required /> {/* email input */}
            <button type='submit'>Register</button> {/* submit button */}
        </form>
    );
}