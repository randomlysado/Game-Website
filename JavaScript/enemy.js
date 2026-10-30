class Enemy{
    health = 2;
    damage = 1;
    speed = 45; //keep 45
    X = 0;
    Y = 0;
    width = 16;
    height = 16;

    move(deltatime){
        const movement = (this.speed *deltatime)/1000;
        if (this.X <=150)
            return;
        this.X -= movement;
    }
    draw(){
        ctx.fillStyle = 'green';
        ctx.fillRect(this.X , this.Y, this.width, this.height);
    }
    takeDmg(damage){
        this.health -= damage;
        p1.score += 1;
    }
}