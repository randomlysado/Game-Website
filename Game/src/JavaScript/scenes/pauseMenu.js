import Phaser from "phaser";
export default class PauseMenu extends Phaser.Scene {

    constructor() {
        super("PauseMenu");
    }

    create() {
        this.add.rectangle(500, 350, 730, 660, 0xffffff).setOrigin(0.5).setRounded(20);
        this.add.rectangle(500, 350, 720, 650, 0x110519).setOrigin(0.5).setRounded(20);
        
        
        this.add.rectangle(500, 220, 660, 160, 0xffffff).setOrigin(0.5).setRounded(20);
        this.add.rectangle(500, 220, 650, 150, 0x000000).setOrigin(0.5).setRounded(20);
        const resumeButton = this.add.text(500, 210, "Resume Game", {
            fontSize: "80px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
        resumeButton.setInteractive();

        resumeButton.on("pointerdown", () => {
            this.scene.stop("PauseMenu");
            this.scene.resume("GameScene");

        });
        this.add.rectangle(500, 410, 660, 160, 0xffffff).setOrigin(0.5).setRounded(30);
        this.add.rectangle(500, 410, 650, 150, 0x000000).setOrigin(0.5).setRounded(30);
        const quitButton = this.add.text(500, 400, "Quit Game", {
            fontSize: "80px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
        quitButton.setInteractive();

        quitButton.on("pointerdown", () => {
            const sessionUser = JSON.parse(sessionStorage.getItem("User"));
            const localUser = JSON.parse(localStorage.getItem(sessionUser.Username));
            sessionUser.Highscore = 0;

            sessionStorage.setItem("Level", 1);
            sessionStorage.setItem("User", JSON.stringify(sessionUser));
            this.scene.stop("GameScene");
            this.scene.stop("PauseMenu");
            this.scene.start("MainMenu");

        });

        // Controls
        this.add.text(500, 600, "WASD / ARROWS - MOVE\nE - SHOOT", {
            fontSize: "20px",
            fontStyle: "Bold",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
    }
}