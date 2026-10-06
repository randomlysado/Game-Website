
const p1 = new Player();



closeHintBox.addEventListener('click', () =>{
controlHintBox.style.visibility = 'hidden';
});




let lastTime = 0;
function draw(currentTime){
    let deltatime = currentTime - lastTime;
    lastTime= currentTime;
        if(deltatime >100){
            deltatime = 100;
        }
    requestAnimationFrame(draw);
    p1.move(deltatime);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameCanvas.clientWidth, gameCanvas.clientHeight); //(X, Y, Width, Height)
    p1.draw();
};


requestAnimationFrame(draw);