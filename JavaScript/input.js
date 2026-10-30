const keys = new Map(); // Holds all keys used
window.addEventListener("keydown", function(event){
    keys.set(event.code,true); //Adds pressed keys to keys and sets to true
})
window.addEventListener("keyup", function(event){
    keys.set(event.code,false); // sets key in keys to false
})
class Player{
    score = JSON.parse(sessionStorage.getItem("User")).Highscore; // grabs user session score to be used through out playthrough
    X = 50; // Player X Postion
    Y = 30; //Player Y Position
    speed = 45; //keep 45
    width = 10;
    height = 10;
    move(deltatime){
        const movement = (this.speed *deltatime)/1000;
        //console.log(this.X);====================================================
        if(keys.get('KeyW')){
            if(this.Y <= 0)
                return
            this.Y -= movement;
        }
          if(keys.get('KeyS')){
              if(this.Y >= 140)
                return
            this.Y += movement;
        }
        if(keys.get('KeyA')){
              if(this.X <= 0)
                return
            this.X -= movement;
        }
        if(keys.get('KeyD')){
            if(this.X >= 290)
                return
            this.X += movement;
        }
        if(keys.get('KeyTab')){
            console.log(keys);
        }
       if(keys.get('KeyF')){
       this.OpenControls();
        }
    }
 draw(){
    ctx.fillStyle = 'orange';
    ctx.fillRect(this.X , this.Y, 10, 10);
    }
    OpenControls(){
     
            controlHintBox.style.visibility = 'visible';
       
    }
};

class Bullet{
    damage = 1;
    speed = 60;




}





