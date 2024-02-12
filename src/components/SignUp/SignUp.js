import './SignUp.css'
import show from '/workspaces/medical_app/src/images/showEye.svg'
import hide from '/workspaces/medical_app/src/images/hideEye.svg'
import { useState } from 'react'
import Validation from '../../FormValidation'

function SignUp(){

const form = document.getElementById('form--main');
const [showPassword, setShowPassword] = useState(false);

function resetForm() {
    form.reset();
    document.getElementsByClassName('form--error').style.display = 'none';
}

const handleClickShowPassword = () => {

    const pwd = document.getElementById("password");
    const show = document.getElementById("showEye");
    const hide = document.getElementById("hideEye");

    setShowPassword(!showPassword);
    {showPassword ? pwd.type = 'text' : pwd.type = 'password'}
    {showPassword ? hide.style.display='inline' : hide.style.display='none'}
    {!showPassword ? show.style.display='inline' : show.style.display='none'}
};

    return(
        <section className='signup--main'>
            <h1>Sign Up</h1>

            <div className="member--text">
                <h2>Already a member?</h2>
                <h2 className="text--login">Login</h2>            
            </div>

            <form className='form--main' id='form--main'>
                <div className="input--section">
                    <label htmlFor="role" className='form--label'>Role</label><br/>
                    <select name='user--select' id="role" className='form--select' onBlur={Validation}>
                        <option placeholder="Select role">Select role </option>
                        <option value="Doctor">Doctor</option>
                        <option value="Patient">Patient</option>
                    </select><br/> 
                    <p className='form--error' id='error--role'>Please select a role</p>                               
                </div>

                <div className="input--section">
                    <label htmlFor="name" className='form--label'>Name:</label><br/>
                    <input type="text" name='user--name' id="name" className='form--input' placeholder="Enter your name" onBlur={Validation}/><br/>
                    <p className='form--error' id='error--name'>Please enter your name</p>                
                </div>

                <div className="input--section">
                    <label htmlFor="phone" className='form--label'>Phone:</label><br/>
                    <input type="number" name='user--phone' id="phone" className='form--input' placeholder="Enter your phone number" onBlur={Validation}/><br/>
                    <p className='form--error' id='error--phone'>Please enter your phone number</p> 
                    <p className='form--error' id='error--phone-valid'>Please enter a vaild phone number</p>                               
                </div>

                <div className="input--section">
                    <label htmlFor="email" className='form--label'>Email:</label><br/>
                    <input type="email" name='user--email' id="email" className='form--input' placeholder="Enter your email" onBlur={Validation}/><br/> 
                    <p className='form--error' id='error--email'>Please enter your email address</p>  
                    <p className='form--error' id='error--email-valid'>Please enter a valid email address</p>                              
                </div>

                <div className="input--section">
                    <label htmlFor="password" className='form--label'>Password:</label><br/>
                    <div className="password">            
                        <input type="password" name='user--pwd' id="password" className='form--input' placeholder="Enter your password" onBlur={Validation}/>

                        <a id="showEye" className="form--eye" onClick={handleClickShowPassword}>
                            <img src={show} alt="test"/>
                        </a>
                        <a id="hideEye" className="form--eye" onClick={handleClickShowPassword}>
                            <img src={hide} alt="test"/>
                        </a>                
                    </div>
                    <p className='form--error' id='error--pwd'>Please enter your password</p>                
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