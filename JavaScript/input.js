const keys = new Map(); // Holds all keys used
window.addEventListener("keydown", function(event){
    keys.set(event.code,true); //Adds pressed keys to keys and sets to true
})
window.addEventListener("keyup", function(event){
    keys.set(event.code,false); // sets key in keys to false
})
class Player{
    X = 50; // Player X Postion
    Y = 30; //Player Y Position
    speed = 100; //keep 45
    move(deltatime){
        const movement = (this.speed *deltatime)/1000;


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
       this.OpenMenu();
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





