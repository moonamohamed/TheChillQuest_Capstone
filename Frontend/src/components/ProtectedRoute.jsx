import {Navigate} from 'react-router-dom'; //import navigate component from react router for redirection

//a wrapper component to protect routes from unauthenticated access
export default function ProtectedRoute({children}) {
    const token= localStorage.getItem('token'); //get token from localStorage (set during login)
    if(!token) { //if no token found redirect user to login page
      return <Navigate to='/login' replace />;
}

    return children; //if token exists, allow access to the protected child component
}