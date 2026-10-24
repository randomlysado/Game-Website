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

__submitbttn.addEventListener('click', Register())


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
let pass = __passwordField.value;
let confirm = __confirmField.value;

if(pass == confirm){
  UserFail("Confirm Failed");
    return;
}
  






}
function Login(){
    
}

function UserFail(error){

    switch(error){
        case "Confirm Failed":
        __errorMsg.innerText = "Failed";

            break;

    }


}

