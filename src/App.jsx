import {Routes, Route} from 'react-router-dom';
import Navbar from './componets/Navbar';
import Login from '.pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dasboard';
import QuestLog from './pages/QuestLog';


function App() {
  return (
    <>
      <navbar />
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
