import './Login.css'
import show from '/workspaces/medical_app/src/images/showEye.svg'
import hide from '/workspaces/medical_app/src/images/hideEye.svg'
import { useState, useEffect } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Validation from '../../Utils/FormValidation'
import { API_URL } from '../../config';


function Login()
{
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const form = document.getElementById('form--main');
 
    function resetForm() {
        form.reset();
        document.getElementsByClassName('form--error').style.display = 'none';
    }

    const handleClickShowPassword = () => {
        const pwd = document.getElementById("password");
        const showImg = document.getElementById("showEye");
        const hideImg = document.getElementById("hideEye");

        setShowPassword(!showPassword);
        {showPassword ? pwd.type = 'text' : pwd.type = 'password'}
        {showPassword ? hideImg.style.display='inline' : hideImg.style.display='none'}
        {!showPassword ? showImg.style.display='inline' : showImg.style.display='none'}
    };

    const navigate = useNavigate();
    useEffect(() => {
      if (sessionStorage.getItem("auth-token")) {
        navigate("/")
      }
    }, []);

    const logintoaccount = async (e) => {
        e.preventDefault();
        const response = await fetch(`${API_URL}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
    
    const json = await response.json();
    const nameFromEmail = email.slice(0, email.lastIndexOf('@'));
        if (json.authtoken) {
        sessionStorage.setItem('auth-token', json.authtoken);
        sessionStorage.setItem('email', email);
        sessionStorage.setItem('name', nameFromEmail)
        navigate('/');
        window.location.reload();
        } else {
            var x = document.getElementById("error--text");
            if (json.errors) {
                for (const error of json.errors) {
                    console.log(error.msg); 
                }
            } else {
                console.log(json.error);
                    let errMsg = "<p>" + json.error + "</p>";              
                    x.insertAdjacentHTML("afterbegin", errMsg)     
                };
            }
        
    };

    return(
        <section className='login--main'>
            <h1>Login</h1>
            <div className="nomember--text">
                <h2>Don't have an account?</h2>
                <Link to={'/SignUp'}> 
                    <h2 className="text--signup">Sign Up</h2>    
                </Link>
                <Outlet/>     
            </div>

            <div className='error--text' id='error--text'>
                
            </div>

            <form className='login--form' onSubmit={logintoaccount}>
                <div className="input--section">
                    <label htmlFor="email" className='login--label'>Email:</label><br/>
                    <input type="email" name='login--email' className='login--input' id="email" placeholder="Enter your email" 
                    onChange={(e) => setEmail(e.target.value)} onBlur={Validation}/><br/> 
                    <p className='form--error' id='error--email'>Please enter your email address</p>  
                    <p className='form--error' id='error--email-valid'>Please enter a valid email address</p>                 
                </div>

                <div className="input--section">
                    <label htmlFor="password" className='login--label'>Password:</label><br/>
                    <div className="password">            
                        <input type="password" name='login--pwd' className='login--input' id="password" placeholder="Enter your password" 
                        onChange={(e) => setPassword(e.target.value)} onBlur={Validation}/>

                        <a id="showEye" className="form--eye">
                            <img src={show} alt="test"  onClick={handleClickShowPassword}/>
                        </a>
                        <a id="hideEye" className="form--eye">
                            <img src={hide} alt="test"  onClick={handleClickShowPassword}/>
                        </a>                
                    </div>
                    <p className='form--error' id='error--pwd'>Please enter your password</p>
                </div>

                <div className="nomember--text">
                    <h2 className="text--forget">Forget Password?</h2>            
                </div>

                <div className="login--button">
                    <button className="button--reset" onClick={resetForm}>Reset</button>
                    <button className="button--login" value='Submit'>Login</button>                
                </div>
            </form>
        </section>
    )
}

export default Login;