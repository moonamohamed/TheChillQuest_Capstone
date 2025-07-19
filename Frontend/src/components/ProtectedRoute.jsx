import {Navigate} from 'react-router-dom';

export default function ProtectedRoute({children}) {
    const token= localStorage.getItem('token');
    return token ? children: <navigate to='/login' replace />
}