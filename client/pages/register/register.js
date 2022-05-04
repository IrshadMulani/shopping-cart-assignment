
function clearErrors() {
        let errors = document.getElementsByClassName('alert');
    
        for (let item of errors) {
            item.innerHTML = ''
        }
    }

function setError(id, error) {
    let element = document.getElementById(id);
    let erroMsg = element.getElementsByClassName('alert')[0];
    erroMsg.style.display = 'block'
    erroMsg.innerHTML = error
}


function validateForm(e){
    e.preventDefault()
    clearErrors();
    console.log(document.myForm.email.value)
    var firstName = document.myForm.firstname.value;
    var lastName = document.myForm.lastname.value;
    var email = document.myForm.email.value;
    var password = document.myForm.password.value;
    var confirmPassword = document.myForm.confirmpassword.value;

    if(firstName.length < 5){
        // alert('First Name length should more than 5 character')
        setError('first', 'First Name length should more than 5 character')
    }

    let regex = /^\S+@\S+\.\S+$/;
    if(!email.match(regex)){
        // alert('First Name length should more than 5 character')
        setError('emailField', 'Add valid email id')
    }


    // let passregex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\w{6,}$/
    let passregex = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).{10,16}$/;
    if(!password.match(passregex)){
        setError('passwordField', `The Password must not contain any whitespaces.<br> 
        The Password must contain at least one Uppercase character.<br>
        The Password must contain at least one Lowercase character.<br>
        The Password must contain at least one digit.<br>
        The Password must have at least one Special Symbol.<br>
        The Password must be 10-16 characters long.
        `)
    }

    if(password !== confirmPassword){
        setError('confirmpasswordField', 'Password and confirm password should match')
    }

 
}