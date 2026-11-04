import Phaser from "phaser";
export default class PauseMenu extends Phaser.Scene {

    constructor() {
        super("PauseMenu");
    }

    create() {

        const bg = this.add.rectangle(500, 350, 700, 650, 0xe7c6ff).setOrigin(0.5);
        this.add.rectangle(500, 220, 650, 150, 0xc8b6ff).setOrigin(0.5);
        const resumeButton = this.add.text(500, 200, "Resume Game", {
            fontSize: "80px",
            fontStyle: "Bold",
            color: "#000000",
            align: "center"
        }).setOrigin(0.5);
        resumeButton.setInteractive();

        resumeButton.on("pointerdown", () => {
            this.scene.stop("PauseMenu");
            this.scene.resume("GameScene");

        });
        const quitButton = this.add.text(500, 400, "Quit Game", {
            fontSize: "80px",
            fontStyle: "Bold",
            color: "#000000",
            align: "center"
        }).setOrigin(0.5);
        quitButton.setInteractive();

        quitButton.on("pointerdown", () => {
            const sessionUser = JSON.parse(sessionStorage.getItem("User"));
            const localUser = JSON.parse(localStorage.getItem(sessionUser.Username));

            if (Number.parseInt(sessionUser.Highscore) > Number.parseInt(localUser.Highscore)) {
                localUser.Highscore = Number.parseInt(sessionUser.Highscore);
                sessionUser.Highscore = 0;
            }
            sessionStorage.setItem("Level", 1);
            sessionStorage.setItem("User", JSON.stringify(sessionUser));
            localStorage.setItem(localUser.Username, JSON.stringify(localUser));
            this.scene.stop("GameScene");
            this.scene.stop("PauseMenu");
            this.scene.start("MainMenu");

        });

        // Controls
        this.add.text(500, 600, "WASD / ARROWS - MOVE\nE - SHOOT", {
            fontSize: "20px",
            fontStyle: "Bold",
            color: "#000000",
            align: "center"
        }).setOrigin(0.5);
    }
}