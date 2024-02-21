import './App.css'
import Home from './components/Home';
import NavBar from './components/NavBar'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from "react-router-dom";
import Cards from './components/Cards';
import Login from './components/Login';
import Dummy from './components/Dummy';


function App() {

  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/cards' element={<Cards />} />
      </Routes>
      {/* <Login /> */}

      {/* <Dummy /> */}
    </>
  )
}

export default App
