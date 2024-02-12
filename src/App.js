import './App.css';
import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/Landing_Page/LandingPage';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">

        <BrowserRouter>
          <Navbar/>
              <Routes>
                <Route path="/" element={<LandingPage/>}/>
                <Route path="/SignUp" element={<SignUp/>}/>
                <Route path='/Login' element={<Login/>}/>
              </Routes>
            
        </BrowserRouter>

    </div>
  );
}

export default App;
