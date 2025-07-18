import {Routes, Route} from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Dashboard from './pages/Dashboard.jsx';
import QuestLog from './pages/QuestLog.jsx';


function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element ={<Dashboard />} />
        <Route path='/login' element ={<Login />} />
        <Route path='/register' element ={<Register />} />
        <Route path='/quests' element ={<QuestLog />} />
      </Routes>
    </>
  );
}

export default App
