import sky from "./assets/sky.png"
import React, { useEffect, useRef } from "react";
import Phaser from "phaser";

const Game: React.FC = () => {
  const gameContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gameContainer.current) return;

    const gameConfig: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: gameContainer.current,
      scene: {
        preload,
        create,
        update
      }
    };

    const game = new Phaser.Game(gameConfig);

    function preload(this: Phaser.Scene) {
      this.load.image("sky", sky);
    }

    function create(this: Phaser.Scene) {
      this.add.image(400, 300, "sky");
    }

    function update(this: Phaser.Scene) {}

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer} style={{ width: "100%", height: "100vh" }} />;
};

export default Game;
