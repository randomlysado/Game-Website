import Phaser from "phaser";

import MainMenu from './scenes/mainMenu.js';
import GameScene from './scenes/gameScene.js';
import PauseMenu from './scenes/pauseMenu.js';
import LoseScene from './scenes/loseScene.js';
import WinScene from './scenes/winScene.js';

const config = {
    type: Phaser.AUTO,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    width: 1000,
    height: 700,
    backgroundColor: '#080820',
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    
    },
    scene: [
        MainMenu,
        GameScene,
        WinScene,
        LoseScene,
        PauseMenu
    ]
};

const game = new Phaser.Game(config);

