import Phaser from "phaser";
export default class WinScene extends Phaser.Scene {

    constructor() {
        super("WinScene");
    }
    sessionVsLocalHS(){
 

        if(this.localUser.Highscore >= this.sessionUser.Highscore){
            this.displayLocalHighest();
            return;
        }
        this.displaySessionHighest();




    }
    displaySessionHighest(){
         const highscore = this.add.text(500, 100, "New Record!\n" +this.sessionUser.Highscore, {
            fontSize: "40px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

    }
    displayLocalHighest(){
        const highscore = this.add.text(500, 150, "HighScore:\n" +this.localUser.Highscore+ "\n\nCurrent Score:\n" +this.sessionUser.Highscore, {
            fontSize: "40px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
    }


    create() {
        this.sessionUser = JSON.parse(sessionStorage.getItem("User"));
        this.localUser = JSON.parse(localStorage.getItem(this.sessionUser.Username));

        this.add.rectangle(500, 350, 710, 660, 0xffffff).setOrigin(0.5).setRounded(20);
        this.add.rectangle(500, 350, 700, 650, 0x190505).setOrigin(0.5).setRounded(20);
      
        this.sessionVsLocalHS();



        this.add.rectangle(500, 450, 410, 110, 0xffffff).setOrigin(0.5).setRounded(20);
        this.add.rectangle(500, 450, 400, 100, 0x000000).setOrigin(0.5).setRounded(20);
        const continueButton = this.add.text(500, 450, "Next Level!", {
            fontSize: "40px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
        continueButton.setInteractive();
        continueButton.on("pointerdown", () => {
            this.scene.stop("WinScene");
            this.scene.start("GameScene");

        });

       this.add.rectangle(500, 600, 410, 110, 0xffffff).setOrigin(0.5).setRounded(20);
        this.add.rectangle(500, 600, 400, 100, 0x000000).setOrigin(0.5).setRounded(20);
        const leaderboardButton = this.add.text(500, 600, "Leaderboard", {
            fontSize: "40px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
        leaderboardButton.setInteractive();
        leaderboardButton.on("pointerdown", () => {
            if (Number.parseInt(this.sessionUser.Highscore) > Number.parseInt(this.localUser.Highscore)) {
                this.localUser.Highscore = Number.parseInt(this.sessionUser.Highscore);
            }
            this.sessionUser.Highscore = 0;
            sessionStorage.setItem("Level", 1);
            sessionStorage.setItem("User", JSON.stringify(this.sessionUser));
            localStorage.setItem(this.localUser.Username, JSON.stringify(this.localUser));
            location.replace('./leaderboard.html');

        });
    }
}