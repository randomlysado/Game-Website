import Phaser from "phaser";
export default class MainMenu extends Phaser.Scene {

    constructor() {
        super("MainMenu");
    }

    create() {
        // Create title
        this.add.text(500, 200, "SPACE SHOOTER",{
            fontSize: "80px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);

        // Create start button
         const startButton = this.add.text(500, 350, "START GAME",{
            fontSize: "80px",
            fontStyle: "Bold",
            color: "#711313",
            align: "center"
        }).setOrigin(0.5);
        startButton.setInteractive();
        startButton.on("pointerdown", () => {
            this.scene.start("GameScene");

        });
        // Controls
        this.add.text(500, 500, "WASD / ARROWS - MOVE\nE - SHOOT", {
            fontSize: "20px",
            color: "#ffffff",
            align: "center"
        }).setOrigin(0.5);
    }}
