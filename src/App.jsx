import {Routes, Route} from 'react-router-dom';
import Navbar from './componets/Navbar';
import Login from '.pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dasboard';
import QuestLog from './pages/QuestLog';


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <navbar />

    </>
  )
}

export default App
