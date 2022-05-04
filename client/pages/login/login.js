
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
    var email = document.myForm.email.value;
    var password = document.myForm.password.value;

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
    if(password.match(passregex) && email.match(regex) ){
        window.location.href="../index.html";
    }
}