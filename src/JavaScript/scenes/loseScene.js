import Phaser from "phaser";
export default class LoseScene extends Phaser.Scene {

    constructor() {
        super("LoseScene");
    }
    sessionVsLocalHS() {


        if (this.localUser.Highscore >= this.sessionUser.Highscore) {
            this.displayLocalHighest();
            return;
        }
        this.displaySessionHighest();
    }
    displaySessionHighest() {
        const highscore = this.add.text(500, 100, "New Record!\n" + this.sessionUser.Highscore, {
            fontSize: "40px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

    }
    displayLocalHighest() {
        const highscore = this.add.text(500, 150, "HighScore:\n" + this.localUser.Highscore + "\n\nCurrent Score:\n" + this.sessionUser.Highscore, {
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




        this.add.rectangle(500, 450, 410, 110, 0xffffff).setOrigin(0.5).setRounded(30);
        this.add.rectangle(500, 450, 400, 100, 0x000000).setOrigin(0.5).setRounded(30);
        const restartButton = this.add.text(500, 450, "Try Again?", {
            fontSize: "40px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
        restartButton.setInteractive();
        restartButton.on("pointerdown", () => {
            this.scene.stop("WinScene");
            this.sessionUser.Highscore = 0;
            sessionStorage.setItem("Level", 1);
            sessionStorage.setItem("User", JSON.stringify(this.sessionUser));
            localStorage.setItem(this.localUser.Username, JSON.stringify(this.localUser));
            this.scene.start("GameScene");

        });

        this.add.rectangle(500, 600, 410, 110, 0xffffff).setOrigin(0.5).setRounded(30);
        this.add.rectangle(500, 600, 400, 100, 0x000000).setOrigin(0.5).setRounded(30);
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