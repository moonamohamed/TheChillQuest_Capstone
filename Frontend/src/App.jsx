import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import QuestLog from './pages/QuestLog.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element ={<ProtectedRoute> <Dashboard /></ProtectedRoute>} />
        <Route path='/login' element ={<Login />} />
        <Route path='/register' element ={<Register />} />
        <Route path='/quests' element ={<ProtectedRoute><QuestLog/></ProtectedRoute>} />
      </Routes>
    </>
  );
}

export default App
