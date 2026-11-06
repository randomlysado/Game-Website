const __modeSwitchButton = document.getElementById('modeSwitch');
const __forgotButton = document.getElementById('forgot');
let loginBool = false;

const __emailField = document.getElementById('email');
const __emailLabel = document.getElementById('emailLabel');

const __usernameField = document.getElementById('username');
const __passwordField = document.getElementById('password');
const __confirmField = document.getElementById('confirmpass');
const __confirmlabel = document.getElementById('confirmlabel');


const __errorMsg = document.getElementById('errormsg');
const __welcomeMsg = document.getElementById('welcome');
const __submitbttn = document.getElementById('submitbttn');

const __passRule1 = document.getElementById('rule1');
const __passRule2 = document.getElementById('rule2');
const __passRule3 = document.getElementById('rule3');
const __passRule4 = document.getElementById('rule4');




__submitbttn.style.marginLeft = "190px"; // re-alligns button to center for sign up/ login page

__passwordField.addEventListener('change', () => {
    const password = __passwordField.value;
    const casePattern1 = /(?=.*[A-Z])/;
    const casePattern2 = /(?=.*[a-z])/;
    const numberPattern = /(?=.*\d)/;
    const lengthPattern = /^.{8,}$/;

    if (casePattern1.test(password)) { __passRule1.style.color = "Green" }
    else { __passRule1.style.color = "red" };

    if (casePattern2.test(password)) { __passRule2.style.color = "green" }
    else { __passRule2.style.color = "red" };

    if (numberPattern.test(password)) { __passRule3.style.color = "green" }
    else { __passRule3.style.color = "red" };

    if (lengthPattern.test(password)) { __passRule4.style.color = "green" }
    else { __passRule4.style.color = "red" };


});
__modeSwitchButton.addEventListener('click', () => {
    switch (loginBool) {
        case false:
            LoginMode();
            break;
        case true:
            SignUpMode();
            break;
    }
}
)



function LoginMode() {
    __forgotButton.style.visibility = 'visible';
    __submitbttn.innerText = "Login";

    __confirmField.style.visibility = 'hidden';
    __emailField.style.visibility = 'hidden';
    __emailLabel.style.visibility = 'hidden';

    __confirmlabel.style.visibility = 'hidden';

    __modeSwitchButton.innerText = "New here? Click me!";

    __welcomeMsg.innerText = "Welcome Back!!";
    __submitbttn.onclick = Login;

    loginBool = true;

}
function SignUpMode() {
    __forgotButton.style.visibility = 'hidden';
    __submitbttn.innerText = "Register";
    __confirmField.style.visibility = 'visible';
    __emailField.style.visibility = 'visible';
    __emailLabel.style.visibility = 'visible';

    __confirmlabel.style.visibility = 'visible';
    __modeSwitchButton.innerText = "Not new here? Click me!";
    __welcomeMsg.innerText = "Welcome!";
    __submitbttn.onclick = Register;
    loginBool = false;
}
function Register() {
    ToggleFields()

    let username = __usernameField.value;
    let email = __emailField.value;
    let pass = __passwordField.value;
    let confirm = __confirmField.value;

    if (!validEmail(email)) { UserFail("Invalid Email"); return; }
    if (username == "") { UserFail("No Username"); return; }
    if (pass == "") { UserFail("No Password"); return; }
    if (!checkNewPassword(pass)) { UserFail("Password Weak"); return; }
    if (pass != confirm) { UserFail("Confirm Failed"); return; }
    if (FindUser(username)) { UserFail("Username unavailable"); return; }

    localStorage.setItem(username, JSON.stringify({ Username: username, Email: email, Password: pass, Highscore: 0 }));
    //creates account in local storage then logs in using Login()
    Login();
}
function Login() {
    ToggleFields() // makes textboxes into read only to prevent errors when logging in after creating an account

    let username = __usernameField.value;
    let pass = __passwordField.value;

    if (!FindUser(username)) {
        UserFail("User Not Found");
        return;
    }
    if (!existingPasswordCheck(username, pass)) {
        UserFail("Wrong Password");
        return;
    }
    sessionStorage.setItem("User", localStorage.getItem(username));
    sessionStorage.setItem("LoggedIn", true);
    location.replace('/src/HTML/game.html')
}
function validEmail(email) {
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}
function checkNewPassword(password) { // checks if the new password has 1 captial and lower case letter, is 8 characters long and has a number
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;
    return pattern.test(password);

}
function existingPasswordCheck(username, password) {
    for (let x = 0; x < localStorage.length; x++) {
        if (localStorage.key(x) == username) {
            let temp = JSON.parse(localStorage.getItem(username));
            if (temp.Password != password) { return; }
            return true;
        }
    }
}
function FindUser(username) {
    let User = JSON.parse(localStorage.getItem(username));
    if (User == null) return false;
    if (User.Username == username) return true;
}

function UserFail(error) {
    switch (error) {
        case "Confirm Failed":
            __errorMsg.innerText = "Passwords don't match, try again!";
            break;
        case "No Username":
            __errorMsg.innerText = "Enter a Username!";
            break;
        case "Password Weak":
            __errorMsg.innerText = "Password Weak, Follow Password Rules and try again!"
            break;
        case "No Password":
            __errorMsg.innerText = "Enter a Password!";
            break;
        case "Username unavailable":
            __errorMsg.innerText = "Username Unavailable, try again!";
            break;
        case "Invalid Email":
            __errorMsg.innerText = "Invalid Email, try again!";

            break;
        default:
            __errorMsg.innerText = "Error, try again!";
            break;
    }
    __errorMsg.style.visibility = 'visible';
    ToggleFields();
}
function ToggleFields() {
    __usernameField.readOnly = !__usernameField.readOnly;
    __passwordField.readOnly = !__passwordField.readOnly;
    __confirmField.readOnly = !__confirmField.readOnly;
    __emailField.readOnly = !__emailField.readOnly;
}



SignUpMode();

