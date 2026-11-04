let loginBool = false;

let sessionsUser = JSON.parse(sessionStorage.getItem("User"));
let localUser = JSON.parse(localStorage.getItem(sessionsUser.Username));

const __emailField = document.getElementById('email');
const __emailLabel = document.getElementById('emailLabel');

const __usernameField = document.getElementById('username');

const __passwordField = document.getElementById('password');
const __newPasswordField = document.getElementById('newPassword');
const __viewPass = document.getElementById('viewPass');



const __msg = document.getElementById('msg');
const __welcomeMsg = document.getElementById('welcome');
const __submitbttn = document.getElementById('submitbttn');
const __resetbttn = document.getElementById('resetbttn');

__viewPass.addEventListener('click', () => {
    if (!__viewPass.checked) {
        __passwordField.type = 'password';
        __newPasswordField.type = 'password';
        return;
    }
    __passwordField.type = 'text';
    __newPasswordField.type = 'text';


})

__submitbttn.addEventListener('click', () => {
    toggleFields();
    checkChanges();

});
__resetbttn.addEventListener('click', () => {
    resetChanges();

});
function checkChanges(){ // this checks the fields the user wants to change then saves 
    let username = __usernameField.value;
    let newpassword = __newPasswordField.value;
    let email = __emailField.value;
    //Checking what fields changed
    if(username === sessionsUser.Username)username = sessionsUser.Username;
    if(newpassword === "")newpassword = sessionsUser.Password;
    if(email === sessionsUser.Email) email = sessionsUser.Email;
    
    let password = __passwordField.value;

    if (!checkOldPassword(password)) {
        userFail("Wrong Password");
        return;
    }
    // Only validate changed fields
    if (username !== sessionsUser.Username && findUser(username)) {
        userFail("Username Unavailable");
        return;
    }
    if (newpassword !== sessionsUser.Password && !checkNewPassword(newpassword)) {
        userFail("Invalid Password");
        return;
    }
    if (email !== sessionsUser.Email && !validEmail(email)) {
        userFail("Invalid Email");
        return;
    }
    saveChanges(username, newpassword, email);
}
function saveChanges(username,newpassword,email) {

    // Apply changes
    sessionsUser.Username = username;
    sessionsUser.Password = newpassword;
    sessionsUser.Email = email;

    localStorage.removeItem(localUser.Username);

    localUser.Username = username;
    localUser.Password = newpassword;
    localUser.Email = email;

    sessionStorage.setItem("User", JSON.stringify(sessionsUser));
    localStorage.setItem(localUser.Username, JSON.stringify(localUser));

   

    toggleFields();
    __msg.innerText = "Saved new changes";
    __msg.style.color = 'lime';
    __msg.style.visibility = 'visible';
}
function resetChanges(){
    __usernameField.value = sessionsUser.Username;
    __emailField.value = sessionsUser.Email;
    __newPasswordField.value = "";
}
function checkOldPassword(password) {
    let savedPassword = sessionsUser.Password;
    if (password == savedPassword) {
        return true;
    }
    return false;
}
function checkNewPassword(password) { // checks if the new password has 1 captial and lower case letter, is 8 characters long and has a number
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.{8,}).*$/;
    return pattern.test(password);

}
function validEmail(email) { // checks for general email format e.g. someaccount@someCompany.com
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

function findUser(username) { // finds if the username already exists
    if (username == "") return false;
    for (let x = 0; x < localStorage.length; x++) {
        if (localStorage.key(x) == username) {
            return true;
        }
    }
    return false;
}
function userFail(error) { //displays appropriate error messages to the user, also has a fail safe incase of unknown errors
    __msg.style.color = 'red';
    switch (error) {
        case "Wrong Password":
            __msg.innerText = "Incorrect password, try again!";
            break;
        case "Username Unavailable":
            __msg.innerText = "Username Unavailable, try again!";
            break;
        case "Invalid Email":
            __msg.innerText = "Invalid Email, try again!";

            break;
        case "Invalid Password":
            __msg.innerText = "Invalid New Password, try again!";
            break;
        default:
            __msg.innerText = "Error, try again!";
            break;
    }
    __msg.style.visibility = 'visible';
    toggleFields();
}
function toggleFields() { // disables fields while being read from
    __usernameField.readOnly = !__usernameField.readOnly;
    __passwordField.readOnly = !__passwordField.readOnly;
    __newPasswordField.readOnly = !__newPasswordField.readOnly;
    __emailField.readOnly = !__emailField.readOnly;
}

resetChanges(); // used to input session email and username into fields


