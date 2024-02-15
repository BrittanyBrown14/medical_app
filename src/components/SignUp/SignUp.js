import './SignUp.css'
import show from '../../images/showEye.svg'
import hide from '../../images/hideEye.svg'
import { useState } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Validation from '../../Utils/FormValidation'
import { API_URL } from '../../config';

function SignUp(){

    const form = document.getElementById('form--main');
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConf, setShowPasswordConf] = useState(false);

    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    function resetForm() {
        form.reset();
        document.getElementsByClassName('form--error').style.display = 'none';
    }

    const handleClickShowPassword = () => {

        const pwd = document.getElementById("password");
        const show = document.getElementById("showEye");
        const hide = document.getElementById("hideEye");

        setShowPassword(!showPassword);
        showPassword ? pwd.type = 'text' : pwd.type = 'password'
        showPassword ? hide.style.display='inline' : hide.style.display='none'
        !showPassword ? show.style.display='inline' : show.style.display='none'
    };

    const handleClickShowPasswordConf = () => {
        const pwd = document.getElementById("password-conf");
        const showImgConf = document.getElementById("showEyeConf");
        const hideImgConf = document.getElementById("hideEyeConf");

        setShowPasswordConf(!showPasswordConf);
        showPasswordConf ? pwd.type = 'text' : pwd.type = 'password'
        showPasswordConf ? hideImgConf.style.display='inline' : hideImgConf.style.display='none'
        !showPasswordConf ? showImgConf.style.display='inline' : showImgConf.style.display='none'
    };

    const register = async (e) => {
    
        e.preventDefault();
        // API Call
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                role:role,
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });
        const json = await response.json();

        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("role", role);
            // phone and email
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            // Redirect to home page
            navigate("/");   //on directing to home page you need to give logic to change login and signup buttons with name of the 
                            //user and logout button where you have implemented Navbar functionality
            window.location.reload();
        } else {
            var x = document.getElementById("error--text");
            if (json.errors) {
                for (const error of json.errors) {
                    console.log(error.msg); 
                }
            } else {
                console.log(json.error);
                json.error.forEach(err => {
                    let errMsg = "<p>" + err.msg + "</p>";              
                    x.insertAdjacentHTML("afterbegin", errMsg)     
                });
            }
        }  
    };
    
    return(
        <section className='signup--main'>
            <h1>Sign Up</h1>

            <div className="member--text">
                <h2>Already a member?</h2>
                <Link to={'/Login'}> 
                        <h2 className="text--login">Login</h2>
                </Link> 
                <Outlet/>    
            </div>

            <div className='error--text' id='error--text'>
                
            </div>

            <form className='form--main' id='form--main' method='POST' onSubmit={register}>
                <div className="input--section">
                    <label htmlFor="role" className='form--label'>Role</label><br/>
                    <select name='user--select' id="role" className='form--select' 
                        onBlur={Validation} onChange={(e) => setRole(e.target.value)}>
                        <option placeholder="Select role">Select role </option>
                        <option value="Doctor">Doctor</option>
                        <option value="Patient">Patient</option>
                    </select><br/> 
                    <p className='form--error' id='error--role'>Please select a role</p>                            
                </div>

                <div className="input--section">
                    <label htmlFor="name" className='form--label'>Name:</label><br/>
                    <input type="text" name='user--name' id="name" className='form--input' placeholder="Enter your name" 
                            onBlur={Validation} onChange={(e) => setName(e.target.value)}/><br/>
                    <p className='form--error' id='error--name'>Please enter your name</p>                
                </div>

                <div className="input--section">
                    <label htmlFor="phone" className='form--label'>Phone:</label><br/>
                    <input type="number" name='user--phone' id="phone" className='form--input' placeholder="Enter your phone number" 
                            onBlur={Validation} onChange={(e) => setPhone(e.target.value)}/> <br/>
                    <p className='form--error' id='error--phone'>Please enter your phone number</p> 
                    <p className='form--error' id='error--phone-valid'>Please enter a vaild phone number</p>                               
                </div>

                <div className="input--section">
                    <label htmlFor="email" className='form--label'>Email:</label><br/>
                    <input value={email} type="email" name='user--email' id="email" className='form--input' placeholder="Enter your email" 
                            onBlur={Validation} onChange={(e) => setEmail(e.target.value)}/><br/> 
                    <p className='form--error' id='error--email'>Please enter your email address</p>  
                    <p className='form--error' id='error--email-valid'>Please enter a valid email address</p>                              
                </div>

                <div className="input--section">
                    <label htmlFor="password" className='form--label'>Password:</label><br/>
                    <div className="password">            
                        <input type="password" name='user--pwd' id="password" className='form--input' placeholder="Enter your password" 
                                onBlur={Validation} />

                        <a id="showEye" className="form--eye" onClick={handleClickShowPassword}>
                            <img src={show} alt="test"/>
                        </a>
                        <a id="hideEye" className="form--eye" onClick={handleClickShowPassword}>
                            <img src={hide} alt="test"/>
                        </a>                
                    </div>
                    <p className='form--error' id='error--pwd'>Please enter your password</p>                
                    <p className='form--error' id='error--pwd-valid'>Please enter a stronger password. <br/>
                                                                    It must contain 8 characters and an <br/>
                                                                    uppercase character.</p>                
                </div>

                <div className="input--section">
                    <label htmlFor="password-conf" className='form--label'>Confirm Password:</label><br/>
                    <div className="password">            
                        <input type="password" name='user--pwd-conf' className='form--input' id="password-conf" placeholder="Enter your password" 
                                onBlur={Validation} onChange={(e) => setPassword(e.target.value)}/>

                        <a id="showEyeConf" className="form--eye">
                            <img src={show} alt="test"  onClick={handleClickShowPasswordConf}/>
                        </a>
                        <a id="hideEyeConf" className="form--eye">
                            <img src={hide} alt="test"  onClick={handleClickShowPasswordConf}/>
                        </a>                
                    </div>
                    <p className='form--error' id='error--pwd-conf'>Please confirm your password</p>
                    <p className='form--error' id='error--pwd-conf-match'>Passwords don't match</p>
                </div>

                <div className="form--button">
                    <button className="button--reset" onClick={resetForm}>Reset</button>
                    <button className="button--signup" value='Submit'>Sign Up</button>                
                </div>
            </form>
        </section>
    )
}

export default SignUp;