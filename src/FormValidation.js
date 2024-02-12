

function formValidation(elementId){
    const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

    const isNumber = (number) =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/i.test(number)

    const form = document.forms[0];
    
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
            console.log("is name")
            break;

        case "phone":
            // phone validation
            if (form['user--phone'].value === "" || form['user--phone'].value === null) 
            {
                document.getElementById('error--phone').style.display = 'block';
            }
            else if(!isNumber(form['user--phone'].value))
            {
                document.getElementById('error--phone-valid').style.display = 'block';
            }
            else
            {
                document.getElementById('error--phone').style.display = 'none';
                document.getElementById('error--phone-valid').style.display = 'none';
            }
            
        case "email":
            
            // email validation
            if (form['user--email'].value === "" || form['user--email'].value === null) 
            {
                document.getElementById('error--email').style.display = 'block';
            }
            else if(!isEmail(form['user--email'].value))
            {
                document.getElementById('error--email-valid').style.display = 'block';
            }
            else
            {
                document.getElementById('error--email').style.display = 'none';
                document.getElementById('error--email-valid').style.display = 'none';
            }
        case "password":

          //password validation
            if(form['user--pwd'].value === "" || form['user--pwd'].value === null)
            {
                document.getElementById('error--pwd').style.display = 'block';
            }
            else
            {
                document.getElementById('error--pwd').style.display = 'none';
            }
        default:
            break;
    }
}

export default formValidation;