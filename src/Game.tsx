// import { useEffect, useRef, useState } from "react";
// import Phaser from "phaser";
// import sky from "./assets/sky.png";
// import ground from "./assets/platform.png"; 
// import star from "./assets/star.png";
// import bomb from "./assets/bomb.png";
// import dude from "./assets/dude.png";

// const Game = () => {
//   const gameContainer = useRef(null);
//   const [gameStarted, setGameStarted] = useState(false); 
//   useEffect(() => {
//     let game;

//     const config = {
//       type: Phaser.AUTO,
//       width: 800,
//       height: 600,
//       physics: {
//         default: "arcade",
//         arcade: {
//           gravity: { y: 300 },
//           debug: false,
//         },
//       },
//       scene: {
//         preload,
//         create,
//         update,
//       },
//     };

//     function preload() {
//       this.load.image("sky", sky);
//       this.load.image("ground", ground);
//       this.load.image("star", star);
//       this.load.image("bomb", bomb);
//       this.load.spritesheet("dude", dude , { frameWidth: 32, frameHeight: 48 });
//     }

//     function create() {
//       this.add.image(400, 300, "sky");

//       let platforms = this.physics.add.staticGroup();
//       platforms.create(400, 568, "ground").setScale(2).refreshBody();
//       platforms.create(600, 400, "ground");
//       platforms.create(50, 250, "ground");
//       platforms.create(750, 220, "ground");

//       let player = this.physics.add.sprite(100, 450, "dude");
//       player.setBounce(0.2);
//       player.setCollideWorldBounds(true);

//       this.anims.create({ key: "left", frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }), frameRate: 10, repeat: -1 });
//       this.anims.create({ key: "turn", frames: [{ key: "dude", frame: 4 }], frameRate: 20 });
//       this.anims.create({ key: "right", frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }), frameRate: 10, repeat: -1 });

//       let cursors = this.input.keyboard.createCursorKeys();
//       let stars = this.physics.add.group({ key: "star", repeat: 11, setXY: { x: 12, y: 0, stepX: 70 } });
//       stars.children.iterate((child) => child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8)));

//       let bombs = this.physics.add.group();
//       let score = 0;
//       let scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", fill: "#000" });

//       this.physics.add.collider(player, platforms);
//       this.physics.add.collider(stars, platforms);
//       this.physics.add.collider(bombs, platforms);
//       this.physics.add.overlap(player, stars, collectStar, null, this);
//       this.physics.add.collider(player, bombs, hitBomb, null, this);

//       function collectStar(player, star) {
//         star.disableBody(true, true);
//         score += 10;
//         scoreText.setText("Score: " + score);

//         if (stars.countActive(true) === 0) {
//           stars.children.iterate((child) => child.enableBody(true, child.x, 0, true, true));
//           let x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
//           let bomb = bombs.create(x, 16, "bomb");
//           bomb.setBounce(1);
//           bomb.setCollideWorldBounds(true);
//           bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
//           bomb.allowGravity = false;
//         }
//       }

//       function hitBomb(player, bomb) {
//         this.physics.pause();
//         player.setTint(0xff0000);
//         player.anims.play("turn");
//         setGameStarted(false); 
//       }
//     }

//     function update() {
//       let cursors = this.input.keyboard.createCursorKeys();
//       let player = this.physics.world.scene.children.list.find((child) => child.texture && child.texture.key === "dude");
//       if (!player) return;

//       if (cursors.left.isDown) {
//         player.setVelocityX(-160);
//         player.anims.play("left", true);
//       } else if (cursors.right.isDown) {
//         player.setVelocityX(160);
//         player.anims.play("right", true);
//       } else {
//         player.setVelocityX(0);
//         player.anims.play("turn");
//       }

//       if (cursors.up.isDown && player.body.touching.down) {
//         player.setVelocityY(-330);
//       }
//     }

//     if (gameStarted) {
//       game = new Phaser.Game(config);
//       gameContainer.current.appendChild(game.canvas);
//     }

//     return () => {
//       if (game) game.destroy(true);
//     };
//   }, [gameStarted]); 
//   const startGame = () => {
//     setGameStarted(true);
//   };

//   return (
//     <div>
//       {!gameStarted && (
//         <button onClick={startGame}>Start Game</button>
//       )}
//       <div ref={gameContainer} />
//     </div>
//   );
// };

// export default Game;

import { useEffect, useRef, useState } from "react";
import Phaser from "phaser";
import sky from "./assets/sky.png";
import ground from "./assets/platform.png";
import star from "./assets/star.png";
import bomb from "./assets/bomb.png";
import dude from "./assets/dude.png";

const Game: React.FC = () => {
  const gameContainer = useRef<HTMLDivElement | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  useEffect(() => {
    let game: Phaser.Game | null = null;

    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      physics: {
        default: "arcade",
        arcade: {
          gravity: { x: 0, y: 300 },
          debug: false,
        },
      },
      scene: {
        preload: preload,
        create: create,
        update: update,
      },
    };

    function preload(this: Phaser.Scene) {
      this.load.image("sky", sky);
      this.load.image("ground", ground);
      this.load.image("star", star);
      this.load.image("bomb", bomb);
      this.load.spritesheet("dude", dude, { frameWidth: 32, frameHeight: 48 });
    }

    function create(this: Phaser.Scene) {
      this.add.image(400, 300, "sky");

      const platforms = this.physics.add.staticGroup();
      platforms.create(400, 568, "ground").setScale(2).refreshBody();
      platforms.create(600, 400, "ground");
      platforms.create(50, 250, "ground");
      platforms.create(750, 220, "ground");

      const player = this.physics.add.sprite(100, 450, "dude");
      player.setBounce(0.2);
      player.setCollideWorldBounds(true);
      player.setName("dude");

      this.anims.create({
        key: "left",
        frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1,
      });

      this.anims.create({
        key: "turn",
        frames: [{ key: "dude", frame: 4 }],
        frameRate: 20,
      });

      this.anims.create({
        key: "right",
        frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1,
      });

      const cursors = this.input.keyboard?.createCursorKeys();
      if (!cursors) {
        console.error("Keyboard input not available!");
        return;
      }

      const stars = this.physics.add.group({
        key: "star",
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 },
      });

      stars.children.iterate((child) => {
        (child as Phaser.Physics.Arcade.Sprite).setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      });

      const bombs = this.physics.add.group();

      let score = 0;
      const scoreText = this.add.text(16, 16, "Score: 0", { fontSize: "32px", fill: "#000" });

      this.physics.add.collider(player, platforms);
      this.physics.add.collider(stars, platforms);
      this.physics.add.collider(bombs, platforms);

      this.physics.add.overlap(player, stars, collectStar, undefined, this);
      this.physics.add.collider(player, bombs, hitBomb, undefined, this);

      function collectStar(
        player: Phaser.GameObjects.GameObject,
        star: Phaser.GameObjects.GameObject
      ) {
        (star as Phaser.Physics.Arcade.Sprite).disableBody(true, true);

        score += 10;
        scoreText.setText("Score: " + score);

        if (stars.countActive(true) === 0) {
          stars.children.iterate((child) => {
            (child as Phaser.Physics.Arcade.Sprite).enableBody(true, child.x, 0, true, true);
          });

          const x = player.x < 400 ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
          const bomb = bombs.create(x, 16, "bomb");
          bomb.setBounce(1);
          bomb.setCollideWorldBounds(true);
          bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
          bomb.allowGravity = false;
        }
      }

      function hitBomb(
        player: Phaser.GameObjects.GameObject,
        bomb: Phaser.GameObjects.GameObject
      ) {
        this.physics.pause();
        (player as Phaser.Physics.Arcade.Sprite).setTint(0xff0000);
        (player as Phaser.Physics.Arcade.Sprite).anims.play("turn");
        setGameStarted(false);
      }
    }

    function update(this: Phaser.Scene) {
      const cursors = this.input.keyboard?.createCursorKeys();
      if (!cursors) {
        console.error("Keyboard input not available!");
        return;
      }

      const player = this.physics.world.scene.children.getByName("dude") as Phaser.Physics.Arcade.Sprite;
      if (!player) {
        console.error("Player not found!");
        return;
      }

      if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);
        player.anims.play("turn");
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }

    if (gameStarted && gameContainer.current) {
      game = new Phaser.Game(config);
      gameContainer.current.appendChild(game.canvas);
    }

    return () => {
      if (game) game.destroy(true);
    };
  }, [gameStarted]);

  const startGame = () => {
    setGameStarted(true);
  };

  return (
    <div>
      {!gameStarted && (
        <button onClick={startGame}>Start Game</button>
      )}
      <div ref={gameContainer} />
    </div>
  );
};

export default Game;