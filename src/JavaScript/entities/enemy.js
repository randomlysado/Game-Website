import Phaser from "phaser";
export default class Enemy {

    constructor(scene, x, y) {
        this.hp = 4;
        this.damage = 1;
        this.awardedPoints = 2;
        this.state = "Entering";
        this.maxCycles = 1;
        this.cycleCount = 0;


        this.scene = scene;
        this.sprite = this.scene.add.image(x, y, 'enemy-default');
        this.sprite.flipX = true;

        this.sprite.setScale(2, 2);

        scene.physics.add.existing(this.sprite);

        this.sprite.originalVelocityX = 0;
        this.sprite.originalVelocityY = 0;

        this.sprite.separationX = 0;
        this.sprite.separationY = 0;
        this.shootTimer = this.scene.time.addEvent({
            delay: 1000,
            callback: this.shoot,
            callbackScope: this,
            loop: true
        });


    }
    update() {
        if (this.sprite.isDestroyed) {
            return;
        }
        if (this.cycleCount >= this.maxCycles) this.state = "Charging";
        if (this.state == "Charging") {
            this.scene.time.removeEvent(this.shootTimer); // ends shooting event if enemy is charging
        }

        switch (this.state) {
            case "Entering":
                this.enter();
                break;

            case "Retreating":
                this.retreat();
                break;

            case "Charging":
                this.charge();
                break;
        }

        this.updateSeparation();

    }
    shoot() {
        const projectile = this.scene.add.sprite(
            this.sprite.x - 30,
            this.sprite.y,
            'projectile'
        );
        projectile.damage = this.damage;
        this.scene.physics.add.existing(projectile);
        this.scene.enemyProjectiles.add(projectile);
        projectile.play('fired');
        projectile.flipX = true;
        this.scene.sound.play('projectile-fired');

        projectile.body.setVelocityX(-1000);
    }

    enter() {
        if (this.sprite.body.x <= 300) {//if this enemys x if greater or equal to 300 then start retreating
            this.state = "Retreating";

            return;
        }
        const speed = 280;
        this.sprite.originalVelocityX = -speed;
        this.sprite.originalVelocityY = 0;

        this.applyMovement(speed);

    }

    retreat() {
        if (this.sprite.body.x >= 960) {
            this.state = "Entering";
            this.cycleCount++;
            return;
        }
        const speed = 140;
        this.sprite.originalVelocityX = speed;
        this.sprite.originalVelocityY = 0;
        this.applyMovement(speed);
    }
    charge() {
        const speed = 400;
        this.damage = 2;
        this.sprite.originalVelocityX = -speed;
        this.sprite.originalVelocityY = 0;

        this.applyMovement(speed);
    }

    applyMovement() {
        this.sprite.body.setVelocity(
            this.sprite.originalVelocityX + this.sprite.separationX,
            this.sprite.originalVelocityY + this.sprite.separationY
        );
        if (this.sprite.originalVelocityY > 0) this.sprite.setTexture('enemy-down');
        if (this.sprite.originalVelocityY < 0) this.sprite.setTexture('enemy-default');
    }
    updateSeparation() {
        this.sprite.separationX *= 0.95;
        this.sprite.separationY *= 0.95;

        this.applyMovement();
    }
    takeDmg(damage) {
        this.hp -= damage;
    }
}