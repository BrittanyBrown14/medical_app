import './Navbar.css'
import menu from '/workspaces/medical_app/src/images/menu.svg'

function toggleMenu() {

        var x = document.getElementById("navbar");
        if (x.style.display === "none") {
        x.style.display = "block";
        } else {
        x.style.display = "none";
        }
    }

    const Navbar = () => {
        
    return(
        <div className='navi'>
            <nav>
                <ul id="navbar" className="navbar">
                    <li>Home</li>
                    <li>Appointments</li>
                    <li>Health Blog</li>
                    <li>Reviews</li>            
                </ul>

            <div className='container--button'>
                <button className='button' id="signup" onclick={toggleMenu}>Sign up</button>
                <button className='button' id="login">Login</button>                
            </div>

            </nav>
        </div>
    )
}

export default Navbar;