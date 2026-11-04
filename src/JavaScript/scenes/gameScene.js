import '/src/style.css';
import Phaser, { Physics } from 'phaser';
import Player from '/src/JavaScript/entities/player.js';
import Enemy from '/src/JavaScript/entities/enemy.js';
export default class GameScene extends Phaser.Scene { //creates child class from Phaser.Scene
    constructor() {
        super('GameScene') //Creates Game Scene
    }
    spawnEnemy() { // spawns enemies randomly along y axis off screen
        if (this.enemies.getLength() >= this.enemySpawnCap) return;
        if (this.enemiesToSpawn == 0) return;

        const enemy = new Enemy(this, 980, Phaser.Math.Between(50, 650));
        enemy.hp = this.enemyMaxHp;
        enemy.damage = this.enemyMaxDamage;
        enemy.awardedPoints = this.enemyMaxPoints;



        this.enemies.add(enemy.sprite); // Phaser Sprite added to physics group
        this.enemyInstances.push(enemy); // obj added to instances array
        this.enemiesToSpawn--;
    }
    separateEnemies(enemy1, enemy2) { // when enemies get too close, they push each other in opposing directions to allow them to continue theyre actions
        const distance = Phaser.Math.Distance.Between( // finds the distance between 2 enemies
            enemy1.x, enemy1.y,
            enemy2.x, enemy2.y
        );

        let angle;

        if (distance === 0) { // finds the angle between enemies
            angle = Math.random() * Math.PI * 2;
        } else {
            angle = Phaser.Math.Angle.Between(
                enemy2.x, enemy2.y,
                enemy1.x, enemy1.y
            );
        }

        const force = 100;

        const pushX = Math.cos(angle) * force;
        const pushY = Math.sin(angle) * force;

        // adding the seperation force to each enemy
        enemy1.separationX += pushX;
        enemy1.separationY += pushY;

        enemy2.separationX -= pushX;
        enemy2.separationY -= pushY;
    }
    findEnemyInstance(enemy) { // finds an enemy instance using the enemy phaser sprite
        const enemyI = this.enemyInstances.find(enemyI => enemyI.sprite === enemy);
        return enemyI;
    }
    destroyEnemy(enemy) { // destroys enemy phaser sprite and instance
        const enemyI = this.findEnemyInstance(enemy);
        this.time.removeEvent(enemyI.shootTimer); // ends shooting event if enemy is charging
        enemy.destroy(); // destroys the phaser obj
        this.enemyInstances.splice(this.enemyInstances.indexOf(enemyI), 1);
    }
    increaseScore(point) {
        this.pScore += point;
    }
    decreaseScore(point) {
        this.pScore -= point;
    }
    gameLost() {
        console.log("Game Lost");
        const sessionUser = JSON.parse(sessionStorage.getItem("User"));
        const localUser = JSON.parse(localStorage.getItem(sessionUser.Username));

        if (Number.parseInt(sessionUser.Highscore) > Number.parseInt(localUser.Highscore)) {
            localUser.Highscore = Number.parseInt(sessionUser.Highscore);
            sessionUser.Highscore = 0;
        }
        sessionStorage.setItem("Level", 1);
        sessionStorage.setItem("User", JSON.stringify(sessionUser));
        localStorage.setItem(localUser.Username, JSON.stringify(localUser));
        this.scene.launch("LoseScene");
    
    }
    gameWon() {
        this.lvl += 1;
        const __User = JSON.parse(sessionStorage.getItem("User"));
        __User.Highscore = parseInt(__User.Highscore) + this.pScore;
        sessionStorage.setItem("User", JSON.stringify(__User));
        sessionStorage.setItem("Level", this.lvl);
        this.scene.launch("WinScene");
    }
    getSessionLevel() {
        if (Number.isInteger(Number.parseInt(sessionStorage.getItem("Level")))) {
            return Number.parseInt(sessionStorage.getItem("Level"));
        } else return 1;
    }
    getSessionScore() {
        const __User = JSON.parse(sessionStorage.getItem("User"));
        if (Number.isInteger(Number.parseInt(__User.Highscore))) {
            return Number.parseInt(__User.Highscore);
        } else return 0;
    }
    increaseDifficulty() {
        for (let x = 1; x < this.lvl - 1; x++) {
            let statChange = false; //stores whether a stat has been changed during this function
            while (!statChange) {
                let randomStat = Phaser.Math.RND.between(1, 5);
                switch (randomStat) {
                    case 1:
                        if (this.enemiesToSpawn <= 45) {
                            this.enemiesToSpawn += 3;
                            statChange = true;
                        }
                        break;
                    case 2:
                        if (this.enemySpawnCap <= 10) {
                            this.enemySpawnCap += 1;
                            statChange = true;
                        }
                        break;
                    case 3:
                        if (this.enemyMaxHp <= 15) {
                            this.enemyMaxHp += 1;
                            statChange = true;
                        }
                        break;
                    case 4:
                        if (this.enemyMaxDamage <= 4) {
                            this.enemyMaxDamage += 1;
                            statChange = true;
                        }
                        break;
                    case 5:
                        if (this.enemyMaxPoints <= 10) {
                            this.enemyMaxPoints += 1;
                            statChange = true;
                        }
                        break;
                }
            }

        }




    }
    setEnemyRules() {
        this.enemiesToSpawn = 5;
        this.enemySpawnCap = 3;
        this.enemyMaxHp = 4;
        this.enemyMaxDamage = 1;
        this.enemyMaxPoints = 2

    }

    preload(){
        this.load.image('background', '/src/assets/Enviroment/backgroud-1.png');
        this.load.image('player-default','/src/assets/Entities/player ship1.png');
        this.load.image('player-down','/src/assets/Entities/player ship2.png');

        this.load.image('enemy-default','/src/assets/Entities/enemy ship1.png');
        this.load.image('enemy-down','/src/assets/Entities/enemy ship2.png');

        this.load.spritesheet('projectile', '/src/assets/Entities/projectile.png',{
            frameWidth:28,
            frameHeight:11,
        })

    }

    create() { // runs on scene creation
        this.anims.create({
            key:"fired",
            frames:this.anims.generateFrameNumbers("projectile",{
                start:0,
                end:3
            }),
            frameRate:10,
            repeat:-1
        })
           


        const gameW = this.scale.width;
        const gameH = this.scale.height;
        this.background = this.add.image(0, 0, 'background');
        this.background.setPosition(gameW/2,gameH/2);
        this.lvl = this.getSessionLevel();
        this.pScore = this.getSessionScore();
        sessionStorage.setItem("Level", this.lvl);
        this.setEnemyRules();
        if (this.lvl > 1) this.increaseDifficulty();
    
        this.player = new Player(this, 100, 350); //creates player instance
        this.playerProjectiles = this.physics.add.group(); // projectiles physics list

        this.enemyInstances = []; // enemy class instances
        this.enemies = this.physics.add.group(); // enemy physics list
        this.enemyProjectiles = this.physics.add.group(); // enemy projectiles physics list

        this.physics.add.collider( // enemy vs enemy
            this.enemies,
            this.enemies,
            (enemy1, enemy2) => {
                this.separateEnemies(enemy1, enemy2);
                console.log("enemies collide");
            }
        )
        this.physics.add.overlap( // player projectiles vs enemies
            this.playerProjectiles,
            this.enemies,
            (projectile, enemy) => {
                const enemyI = this.findEnemyInstance(enemy);;
                if (!enemyI) return;
                enemyI.takeDmg(projectile.damage);

                projectile.destroy()
                if (enemyI.hp <= 0) {
                    this.increaseScore(enemyI.awardedPoints);
                    this.destroyEnemy(enemy)
                }


            }
        )
        this.physics.add.overlap( // enemy projectiles vs player
            this.player.sprite,
            this.enemyProjectiles,
            (player, projectile) => {

                this.player.takeDmg(projectile.damage);
                projectile.destroy();
                console.log("Player sprite:", this.player.sprite);
                console.log("Player body:", this.player.sprite.body);
            }
        )
        this.physics.add.collider( // player vs enemies
            this.player.sprite,
            this.enemies,
            (player, enemy) => {// if the enemy is in charging state then deal damage to player and destroy self
                const enemyI = this.findEnemyInstance(enemy);;
                if (!enemy) return;
                if (enemyI.state == "Charging") {
                    this.player.hp -= enemyI.damage;
                    this.destroyEnemy(enemy);

                }
                console.log("Player hit an enemy ");

            }
        )


        this.time.addEvent({
            delay: 2000, //wait 2 seconds before next call
            callback: this.spawnEnemy, // spawnEnemy method
            callbackScope: this,
            loop: true
        })

    }
    update() { // runs 60 times a second
        this.pauseGame();
        this.player.movement(); // move the player
        this.player.shoot(); //player shoots bullets

        this.enemyInstances.forEach((enemy) => { enemy.update(); }) // runs each enemies update method
        this.endGame();


        // Remove enemies that leave the screen
        this.enemies.children.forEach((enemy) => {
            if (enemy && enemy.body.x < -50 || enemy.body.y <= -50 || enemy.body.y >= 750) {
                console.log("Out Of map");
                this.destroyEnemy(enemy);
            }
        });
        // Remove enemyprojectiles that leave the screen
        this.enemyProjectiles.children.forEach((projectile) => {
            if (projectile && projectile.body.x < -50 || projectile.body.y <= -50 || projectile.body.y >= 750) {
                console.log("Out Of map");
                projectile.destroy();
            }
        });
        // Remove player projectiles that leave the screen
        this.playerProjectiles.children.forEach((projectile) => {
            if (projectile && projectile.x > 1050) {
                projectile.destroy();
            }
        });

    }

    endGame() {
        if (this.player.hp <= 0) {
            this.scene.pause();
            this.gameLost();
        }
        if (this.enemiesToSpawn == 0 && this.enemies.getLength() <= 0) {
            this.scene.pause();
            this.gameWon();
        }



    }
    pauseGame() {
        if (Phaser.Input.Keyboard.JustDown(this.player.pauseKey)) {
            this.scene.launch("PauseMenu");
            this.scene.pause();
        }
    }

}


