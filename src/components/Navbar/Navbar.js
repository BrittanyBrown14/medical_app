import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    const [click, setClick] = useState(false);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState("");
    const [email, setEmail]=useState("");
    const [showDropdown, setShowDropdown] = useState(false);

    
    const handleLogout = () => {
        sessionStorage.removeItem("auth-token");
        sessionStorage.removeItem("name");
        sessionStorage.removeItem("email");
        sessionStorage.removeItem("phone");
        // remove email phone
        localStorage.removeItem("doctorData");
        setIsLoggedIn(false);
        // setUsername("");
       
        // Remove the reviewFormData from local storage
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key.startsWith("reviewFormData_")) {
            localStorage.removeItem(key);
          }
        }
        setEmail('');
        window.location.reload();
    }
    const handleDropdown = () => {
      setShowDropdown(!showDropdown);
      
    }
    useEffect(() => { 
      const storedEmail = sessionStorage.getItem("email");
      const storedName = sessionStorage.getItem("name");

      if (storedEmail) {
            setIsLoggedIn(true);
            setUsername(storedName);
          }
        }, []);

    return(
        <div className='navi'>
            <nav>
                <ul id="navbar" className="navbar">
                    
                    <Link to={'/'}>
                        <li className='navbar--list-item'>Home</li>
                    </Link>
                    <Link to={'/instant-consultation'}>
                        <li className='navbar--list-item'>Appointments</li>
                    </Link>
                    <li>Health Blog</li>
                    <Link to={'/Reviews'}>
                        <li className='navbar--list-item'>Reviews</li>
                    </Link>        
                </ul>

                <div className='container--button'>
                    
                    {isLoggedIn?(
                        <>
                        <div className='navbar--welcome-loginout' onMouseEnter={handleDropdown} onMouseLeave={handleDropdown}>
                            <p className='name--logged-in'  >Welcome, {username}</p>
                            {showDropdown ? 
                                <div id="dropdown" className="dropdown">
                                    <Link to={'/Profile'}>
                                        <p className="dropdown-content" >Your Profile</p>
                                    </Link>
                                    <Link to={'/Reports'}>
                                        <p className="dropdown-content" >Your Reports</p>
                                    </Link>
                                </div>

                            :null}
                            
                        </div>
                            
                            <Link to={'/'}>
                                <button className='button' id="logout" onClick={handleLogout}>Log Out</button>  
                            </Link>
                            
                        </>
                        ) : (
                            <>
                                <Link to={'/SignUp'}> 
                                    <button className='button' id="signup">Sign up</button>
                                </Link>
                                <Link to={'/Login'}> 
                                    <button className='button' id="login" >Login</button>  
                                </Link>  
                            </>
                        )}         
                </div>
                <Outlet/>
            </nav>
        </div>
    )
}

export default Navbar;