

function formValidation(elementId){
    const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isNumber = (number) =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(number);

    const isPassword = (password) =>
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm.test(password);

    const form = document.forms[0];
    
    switch (form.className) {
        case "login--form":

            switch (elementId.currentTarget.id) {
                case "email":
                        // email validation
                        if (form['login--email'].value === "" || form['login--email'].value === null) 
                        {
                            document.getElementById('error--email').style.display = 'block';
                            document.getElementById('error--email-valid').style.display = 'none';
                        }
                        else if(!isEmail(form['login--email'].value))
                        {
                            document.getElementById('error--email').style.display = 'none';
                            document.getElementById('error--email-valid').style.display = 'block';
                        }
                        else
                        {
                            document.getElementById('error--email').style.display = 'none';
                            document.getElementById('error--email-valid').style.display = 'none';
                        }
    
                    break;

                case "password":
                    if (form['login--pwd'].value === "" || form['login--pwd'].value === null) 
                    {
                        document.getElementById('error--pwd').style.display = 'block';
                    }
                    else
                    {
                        document.getElementById('error--pwd').style.display = 'none';
                    }
                    break;
                    
                default:
                    break;
            }
            
            break;

        case "form--main":
            var checkPwd = form['user--pwd'].value;

            switch (elementId.currentTarget.id) {
                case "role":
                    //role validation
                    if (form['user--select'].value === "Select role" || form['user--select'].value === "" || form['user--name'].value === null) 
                    {
                        document.getElementById('error--role').style.display = 'block';
                    }
                    else
                    {
                        document.getElementById('error--role').style.display = 'none';
                    }
                    break;

                case "name":
                    // name vaildation
                    if (form['user--name'].value === "" || form['user--name'].value === null) 
                    {
                        document.getElementById('error--name').style.display = 'block';
                    }
                    else
                    {
                        document.getElementById('error--name').style.display = 'none';

                    }
                    break;

                case "phone":
                    // phone validation
                    if (form['user--phone'].value === "" || form['user--phone'].value === null) 
                    {
                        document.getElementById('error--phone').style.display = 'block';
                        document.getElementById('error--phone-valid').style.display = 'none';
                    }
                    else if(!isNumber(form['user--phone'].value))
                    {
                        document.getElementById('error--phone-valid').style.display = 'block';
                        document.getElementById('error--phone').style.display = 'none';
                    }
                    else
                    {
                        document.getElementById('error--phone').style.display = 'none';
                        document.getElementById('error--phone-valid').style.display = 'none';
                    }
                    break;
                    
                case "email":
                    
                    // email validation
                    if (form['user--email'].value === "" || form['user--email'].value === null) 
                    {
                        document.getElementById('error--email').style.display = 'block';
                        document.getElementById('error--email-valid').style.display = 'none';
                    }
                    else if(!isEmail(form['user--email'].value))
                    {
                        document.getElementById('error--email').style.display = 'none';
                        document.getElementById('error--email-valid').style.display = 'block';
                    }
                    else
                    {
                        document.getElementById('error--email').style.display = 'none';
                        document.getElementById('error--email-valid').style.display = 'none';
                    }
                    break;

                case "password":

                //password validation
                    if(form['user--pwd'].value === "" || form['user--pwd'].value === null)
                    {
                        document.getElementById('error--pwd').style.display = 'block';
                        document.getElementById('error--pwd-valid').style.display = 'none';
                        break;
                    }
                    else if(!isPassword(form['user--pwd'].value))
                    {
                        document.getElementById('error--pwd-valid').style.display = 'block'
                        document.getElementById('error--pwd').style.display = 'none';                        
                    }
                    else
                    {
                        document.getElementById('error--pwd').style.display = 'none';
                        document.getElementById('error--pwd-valid').style.display = 'none';
                        checkPwd = form['user--pwd'].value;
                    }
                                          
                case "password-conf":
                    if(form['user--pwd-conf'].value === "" || form['user--pwd'].value === null)
                    {
                        document.getElementById('error--pwd-conf').style.display = 'block';
                        document.getElementById('error--pwd-conf-match').style.display = 'none'
                        break;
                    }
                    else if(form['user--pwd-conf'].value !== checkPwd)
                    {
                        document.getElementById('error--pwd-conf-match').style.display = 'block'
                        document.getElementById('error--pwd-conf').style.display = 'none';
                        
                    }
                    else
                    {
                        document.getElementById('error--pwd-conf').style.display = 'none';
                        document.getElementById('error--pwd-conf-match').style.display = 'none'
                        checkPwd = form['user--pwd'].value;
                    }
                    break; 
                default:
                    break;
            }
            break;
    
        default:
            break;
    }
}

export default formValidation;