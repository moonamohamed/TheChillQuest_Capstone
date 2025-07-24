//react router components used for naviagtion between pages
import {Routes, Route} from 'react-router-dom';
//navigation bar show on all pages
import Navbar from './components/Navbar.jsx';
//individual page components (views)
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import QuestLog from './pages/QuestLog.jsx';
//wraps protected routes to check for JWT
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './App.css'



function App() {
  return (
    <>
      <Navbar /> 
      <Routes> 
        <Route path='/' element ={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
        <Route path='/login' element ={<Login />} />
        <Route path='/register' element ={<Register />} />
        <Route path='/questlog' element ={<ProtectedRoute><QuestLog/></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App
