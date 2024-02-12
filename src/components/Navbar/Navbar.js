import { Link, Outlet } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
    return(
        <div className='navi'>
            <nav>
                <ul id="navbar" className="navbar">
                    
                    <Link to={'/'}>
                        <li className='navbar--list-item'>Home</li>
                    </Link>
                    <li>Appointments</li>
                    <li>Health Blog</li>
                    <li>Reviews</li>            
                </ul>

                <div className='container--button'>
                    <Link to={'/SignUp'}> 
                        <button className='button' id="signup">Sign up</button>
                    </Link>
                    
                    <button className='button' id="login" >Login</button>              
                </div>
                <Outlet/>
            </nav>
        </div>
    )
}

export default Navbar;