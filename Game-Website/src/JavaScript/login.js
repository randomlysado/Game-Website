const __modeSwitchButton = document.getElementById('modeSwitch');
let loginBool = false;

const __usernameField = document.getElementById('username');
const __passwordField = document.getElementById('password');
const __confirmField = document.getElementById('confirmpass');


const __errorMsg = document.getElementById('errormsg');
const __submitbttn = document.getElementById('submitbttn');


SignUpMode();
__modeSwitchButton.addEventListener('click', () => {
switch(loginBool){

    case false:
        LoginMode();
        break;
        case true:
            SignUpMode();
            break;

}
})



function LoginMode(){

 __submitbttn.innerText = "Login";
__confirmField.style.visibility = 'hidden';
__modeSwitchButton.innerText = "New here? Click me!";
__submitbttn.onclick = Login;

loginBool = true;

}
function SignUpMode(){
    __submitbttn.innerText = "Register";    
    __confirmField.style.visibility = 'visible';
    __modeSwitchButton.innerText = "Not new here? Click me!";
    __submitbttn.onclick = Register;
    loginBool = false;
}
function Register(){
    ToggleFields()

    let username = __usernameField.value;
    let pass = __passwordField.value;
    let confirm = __confirmField.value;

    if(pass != confirm){ //checks if passwords dont match 
        UserFail("Confirm Failed");
        return;
    }
    if (username == "" || FindUser(username)){ // checks if the username is already used
        UserFail("Username unavailable");
        return;
    }
    
    localStorage.setItem(username, JSON.stringify({Username: username, Password: pass, Highscore: 0})); //creates account in local storage then logs in using Login()
    Login();
}
function Login(){
    ToggleFields() // makes textboxes into read only to prevent errors when logging in after creating an account

    let username = __usernameField.value;
    let pass = __passwordField.value;

    if (!FindUser(username)){
        UserFail("User Not Found");
        return;
    }
    if(!PasswordCheck(username, pass)){
        UserFail("Wrong Password");
        return;
    }
    sessionStorage.setItem("User",localStorage.getItem(username));
    sessionStorage.setItem("LoggedIn", true);
    location.replace('src/HTML/game.html')
}
function PasswordCheck(username, password){
    for(let x = 0; x<localStorage.length;x++){
        if(localStorage.key(x) == username){
            let temp = JSON.parse(localStorage.getItem(username));
            if(temp.Password != password){return;}
            return true;
        }
    }
}
function FindUser(username){
    if(username =="") return false;
    for(let x = 0; x<localStorage.length;x++){
        if(localStorage.key(x) == username){
            return true;
        }
    }
    return false;
}

function UserFail(error){
    switch(error){
        case "Confirm Failed":
            __errorMsg.innerText = "Passwords don't match, try again!";
            break;
        case"Username unavailable":
            __errorMsg.innerText = "Username Unavailable, try again!";
            break;
        default:
            __errorMsg.innerText = "Error, try again!";
            break;
    }
        __errorMsg.style.visibility = 'visible';
        ToggleFields();
}
function ToggleFields(){
    __usernameField.readOnly = !__usernameField.readOnly;
    __passwordField.readOnly = !__passwordField.readOnly;
    __confirmField.readOnly =  !__confirmField.readOnly;
}

