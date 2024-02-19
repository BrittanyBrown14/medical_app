import './App.css';
import LandingPage from './components/Landing_Page/LandingPage';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import InstantConsultation from './components/Instant_Consultation/InstantConsultation';
import Notification from './components/Notification/Notification';
import ReviewForm from './components/ReviewForm/ReviewForm';
import ProfileForm from './components/ProfileCard/ProfileCard';
import ReportsLayout from './components/ReportsLayout/ReportsLayout';
import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="App">

        <BrowserRouter>
            <Notification>
                <Routes>
                  <Route path="/" element={<LandingPage/>}/>
                  <Route path="/SignUp" element={<SignUp/>}/>
                  <Route path='/Login' element={<Login/>}/>
                  <Route path="/instant-consultation" element={<InstantConsultation />}/>
                  <Route path='/Reviews' element={<ReviewForm/>}/>
                  <Route path='/Profile' element={<ProfileForm/>}/>
                  <Route path='/Reports' element={<ReportsLayout/>}/>
                </Routes>
            </Notification>
        </BrowserRouter>

    </div>
  );
}

export default App;
