const leaderboard = document.getElementById('Scoreboard');
const leaderboardBody = document.querySelector("tbody");
let users = [];
for (let x = 0; x < localStorage.length; x++) { //gathers all users in local storage
    const user = JSON.parse(localStorage.getItem(localStorage.key(x)));
    users.push(user);


}
function sort() {

    for (let i = 0; i < users.length; i++) {

        // Last i elements are already in place  
        for (let j = 0; j < (users.length - i - 1); j++) {

            // Checking if the item at present iteration 
            // is greater than the next iteration
            if (users[j].Highscore > users[j + 1].Highscore) {

                // If the condition is true
                // then swap them
                let temp = users[j]
                users[j] = users[j + 1]
                users[j + 1] = temp
            }
        }
    }
    users = users.reverse();

}
function displayLeaderboard() {
    for (let x = 0; x < users.length; x++) {
        const row = leaderboardBody.insertRow(-1);
        const rankCell = row.insertCell(0);
        const nameCell = row.insertCell(1);
        const scoreCell = row.insertCell(2);
        
        switch (x) {
            case 0:
                rankCell.innerHTML = (x + 1) + "st";
                break;
            case 1:
                rankCell.innerHTML = (x + 1) + "nd";
                break;
            case 2:
                rankCell.innerHTML = (x + 1) + "rd";
                break;
            default:
                rankCell.innerHTML = (x + 1) + "th";
                break;
        }
        nameCell.innerHTML = users[x].Username;
        scoreCell.innerHTML = users[x].Highscore;
    }
}


sort();
displayLeaderboard();





