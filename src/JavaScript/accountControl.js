const navbttns = document.getElementById('Nav-bttns');
const navBar = document.getElementById('Nav-Bar');

function CheckLoggedIn(){
    if(sessionStorage.getItem("LoggedIn") == "false"||sessionStorage.getItem("LoggedIn") == "undefined" ||sessionStorage.getItem("LoggedIn") == null){
        return false;
    }
    else
    {
        return true;
    }
}
function SignOut(){
    sessionStorage.setItem("LoggedIn",false);
    sessionStorage.setItem("User",undefined);
    sessionStorage.setItem("Level",undefined);

    location.replace('/index.html');
}

if(CheckLoggedIn()){// this creates a logout button for the user if theyre logged in
    const logoutbttn = document.createElement('a');
    logoutbttn.id = 'navbttn';
    logoutbttn.innerText = "Log Out"
    logoutbttn.addEventListener('click', () => SignOut());
    navbttns.appendChild(logoutbttn);
}
else if(!CheckLoggedIn() && location.pathname !='/index.html') //check if user is not logged in and not on the login page
{
    location.replace('/index.html');// sends user to home page

}
