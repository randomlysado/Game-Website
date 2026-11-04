const __modeSwitchButton = document.getElementById('modeSwitch');
const __forgotButton = document.getElementById('forgot');
let loginBool = false;

const __emailField = document.getElementById('email');
const __emailLabel = document.getElementsByClassName('emailLabel');

const __usernameField = document.getElementById('username');
const __passwordField = document.getElementById('password');
const __confirmField = document.getElementById('confirmpass');


const __errorMsg = document.getElementById('errormsg');
const __welcomeMsg = document.getElementById('welcome');
const __submitbttn = document.getElementById('submitbttn');


SignUpMode();
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
    __emailLabel.item(0).style.visibility = 'hidden';
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
    __emailLabel.item(0).style.visibility = 'visible';
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
    if(!validEmail(email)){
        UserFail("Invalid Email");
        return;
    }
    if (pass != confirm) { //checks if passwords dont match 
        UserFail("Confirm Failed");
        return;
    }
    if (username == "" || FindUser(username)) { // checks if the username is already used
        UserFail("Username unavailable");
        return;
    }
    localStorage.setItem(username, JSON.stringify({ Username: username,Email: email, Password: pass, Highscore: 0 })); //creates account in local storage then logs in using Login()
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
    if (!PasswordCheck(username, pass)) {
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
function PasswordCheck(username, password) {
    for (let x = 0; x < localStorage.length; x++) {
        if (localStorage.key(x) == username) {
            let temp = JSON.parse(localStorage.getItem(username));
            if (temp.Password != password) { return; }
            return true;
        }
    }
}
function FindUser(username) {
    if (username == "") return false;
    for (let x = 0; x < localStorage.length; x++) {
        if (localStorage.key(x) == username) {
            return true;
        }
    }
    return false;
}

function UserFail(error) {
    switch (error) {
        case "Confirm Failed":
            __errorMsg.innerText = "Passwords don't match, try again!";
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

