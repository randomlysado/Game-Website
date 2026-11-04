import Phaser from "phaser";
export default class Player{

    constructor(scene, x, y) {
        this.hp = 5;
        this.damage = 2;


        this.scene = scene;
        this.sprite =scene.add.rectangle(x, y, 40, 40, 0x00aaff);
        scene.physics.add.existing(this.sprite);
        this.sprite.body.setImmovable(true);
        this.sprite.body.setCollideWorldBounds(true);
        // Keyboard controls
        this.keys = scene.input.keyboard.addKeys({
            up: 'W',
            down: 'S',
            left: 'A',
            right: 'D'
        });
        this.shootKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.cursors = scene.input.keyboard.createCursorKeys();
    }

    movement() {
        const speed = 300;

        let velocityX = 0;
        let velocityY = 0;

        if (this.keys.left.isDown || this.cursors.left.isDown) velocityX -= 1;
        if (this.keys.right.isDown || this.cursors.right.isDown) velocityX += 1;
        if (this.keys.up.isDown || this.cursors.up.isDown) velocityY -= 1;
        if (this.keys.down.isDown || this.cursors.down.isDown) velocityY += 1;



        const velocity = new Phaser.Math.Vector2(velocityX, velocityY);

        if (velocity.length() > 0) {
            velocity.normalize().scale(speed);
        }
        //console.log("Player X:" + this.sprite.body.x +" Player Y: "+ this.sprite.body.y );
        this.sprite.body.setVelocity(velocity.x, velocity.y);
        //console.log("Player HP: " + this.hp);
    }

    shoot() {
       if (Phaser.Input.Keyboard.JustDown(this.shootKey)) {
            const projectile = this.scene.add.rectangle(
                this.sprite.x + 30,
                this.sprite.y,
                12,
                6,
                0xffff00
            );
            projectile.damage = this.damage;
            this.scene.physics.add.existing(projectile);
            this.scene.playerProjectiles.add(projectile);

            projectile.body.setVelocityX(500);
        }
    }
    takeDmg(damage){
        this.hp -= damage;

    }
}