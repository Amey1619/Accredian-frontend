import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Header from './Components/Navbar/Header';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import "./index.css";
function App() {
  return (
    <>
    <Header/>
    <BrowserRouter>
     <Routes>
     <Route path='/' element={<Login/>} />
     <Route path='/signup' element={<Signup/>}/>
     </Routes>
    </BrowserRouter>
    </>
  );
}

export default App
