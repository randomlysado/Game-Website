const navbttns = document.getElementById('Nav-bttns');
const navBar = document.getElementById('Nav-Bar');

function CheckLoggedIn() {
    if (sessionStorage.getItem("LoggedIn") == "false" || sessionStorage.getItem("LoggedIn") == "undefined" || sessionStorage.getItem("LoggedIn") == null) {
        return false;
    }
    else {
        return true;
    }
}
function SignOut() {
    sessionStorage.setItem("LoggedIn", false);
    sessionStorage.setItem("User", undefined);
    sessionStorage.setItem("Level", undefined);

    location.replace('src/HTML/signup.html');
}

if (CheckLoggedIn()) {// this creates a logout button for the user if theyre logged in
    const logoutbttn = document.createElement("a");
    logoutbttn.id = 'logoutbttn';
    logoutbttn.innerText = "Log Out"
    logoutbttn.addEventListener('click', () => SignOut());
    navbttns.appendChild(logoutbttn);

    const settingsbttn = document.createElement("a");
    settingsbttn.id = 'settingbttn';
    settingsbttn.innerText = "Settings"
    settingsbttn.href = '/src/HTML/settings.html';
    navbttns.appendChild(settingsbttn);


}
else if (!CheckLoggedIn() && location.pathname != '/src/HTML/signup.html' && location.pathname != '/index.html') //check if user is not logged in and not on the login page
{
    location.replace('/src/HTML/signup.html');// sends user to home page

}
