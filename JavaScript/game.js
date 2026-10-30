const gameCanvas = document.getElementById('game-canvas');

const controlHintBox = document.getElementById('controlHintBox');
const closeHintBox = document.getElementById('closeHintBox');

const ctx = gameCanvas.getContext('2d');
const p1 = new Player();
const pBullets= [];
const enemies = [];
const enemiesColliding = new Set();
let enemiesToSpawn = 0;
let spawnEvent;
let lvl=1;
window.addEventListener('resize', () => {
    gameCanvas.clientWidth = window.innerWidth;
    gameCanvas.clientHeight = window.innerHeight;
})
closeHintBox.addEventListener('click', () =>{
    controlHintBox.style.visibility = 'hidden';
});
if(sessionStorage.getItem("Level") != 'NaN'){
    lvl = sessionStorage.getItem("Level");
}


function startGame(){

    switch (lvl){
        case "1": 
            enemiesToSpawn = 3;
            spawnEvent = setInterval(spawnEnemy, 3000);



            break;
    }
}

function spawnEnemy(){
    if(enemiesToSpawn == 0) return; // if there are no enemies to spawn then return early
    const enemy = new Enemy(); // create a new ememy object
    enemy.X = 300; // setting position and size of enemy
    enemy.Y = Math.random() * 140;
    console.log(enemy.Y);
    enemy.width = 16;
    enemy.height = 16;

    enemies.push(enemy);
    enemiesToSpawn -= 1; // reduce the number of enemies to spawn



}

function endGame(){
    let user = JSON.parse(sessionStorage.getItem("User"));
    user.Highscore = p1.score;

    sessionStorage.setItem("User", JSON.stringify(user));
    sessionStorage.setItem("Level", parseInt(lvl));

}
function drawEnemies(){
   for (let x=0; x<enemies.length; x++){
        enemies[x].draw();
    }

}
function moveEnemies(deltatime){
    for (let x=0; x<enemies.length; x++){
        enemies[x].move(deltatime);
    }
}

function collisionDetection(){

    const currentCollisions = new Set();

    for (let e =0; e< enemies.length; e++){

        const enemy = enemies[e];

        if((p1.Y + p1.height) >= enemy.Y // if player top side is greater than enemy y
        && p1.Y <= (enemy.Y + enemy.height)//enemy top side is less than enemy y
        && (p1.X + p1.width) >= enemies[e].X
        && p1.X <= (enemy.X + enemy.width))
            {
                currentCollisions.add(enemy);
                if(!enemiesColliding.has(enemy)){
                    console.log("collide");
                    enemy.takeDmg(1);
                }                
                if(enemy.health <= 0){
                enemies.splice(e,1);
                e--;
                }
            }
    }

    enemiesColliding.clear();

    for (const enemy of currentCollisions) {
        if (enemies.includes(enemy)) {
            enemiesColliding.add(enemy);
        }
    }



}
let lastTime = 0;
function update(currentTime){
    let deltatime = currentTime - lastTime;
    lastTime= currentTime;
        if(deltatime >100){
            deltatime = 100;
        }
    p1.move(deltatime);
    moveEnemies(deltatime);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.clientWidth, gameCanvas.clientHeight); //(X, Y, Width, Height)
    drawEnemies();
    p1.draw();
    if(enemiesToSpawn == 0 && enemies.length == 0){ //if there are no enemies to spawn and none exist already then game ends
        clearInterval(spawnEvent);
        endGame();
    }
    collisionDetection();
    requestAnimationFrame(update);
};
startGame();
requestAnimationFrame(update);