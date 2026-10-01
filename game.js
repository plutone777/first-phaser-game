class mainScene {
  preload() {
    this.load.image("player", "assets/player.png");
    this.load.image("coin", "assets/coin.png");
  }

  create() {
    this.player = this.physics.add.sprite(100, 100, "player");
    this.player.setScale(1.5);
    this.coin = this.physics.add.sprite(300, 300, "coin");
    this.coin.setScale(1.5);
    this.score = 0;
    this.gameWon = false;
    let style = { font: "16px 'Press Start 2P'", fill: "#fff" };
    this.scoreText = this.add.text(8, 8, "score: " + this.score, style);
    this.arrow = this.input.keyboard.createCursorKeys();
    this.enterKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
  }

  update() {
    if (this.gameWon) {
      if (this.enterKey.isDown) {
        this.scene.restart();
      }
      return;
    }

    if (this.physics.overlap(this.player, this.coin)) {
      this.hit();
    }

    if (this.arrow.right.isDown) {
      this.player.x += 3;
    } else if (this.arrow.left.isDown) {
      this.player.x -= 3;
    }

    if (this.arrow.down.isDown) {
      this.player.y += 3;
    } else if (this.arrow.up.isDown) {
      this.player.y -= 3;
    }
  }

  hit() {
    // Change the position x and y of the coin randomly
    this.coin.x = Phaser.Math.Between(100, 600);
    this.coin.y = Phaser.Math.Between(100, 300);

    // Increment the score by 1
    this.score += 1;

    // Display the updated score on the screen
    this.scoreText.setText('score: ' + this.score);

    // Win
    if (this.score === 3) {
    this.win();
    }

    // Create a new tween 
    this.tweens.add({
      targets: this.player, // on the player 
      duration: 200, // for 200ms 
      scaleX: 1, // that scale vertically by 20% 
      scaleY: 1, // and scale horizontally by 20% 
      yoyo: true, // at the end, go back to original scale 
    });
  }

  win() {
  this.add.text(170, 230, "YOU WIN!", {
    font: "32px 'Press Start 2P'",
    fill: "#ffffff"
  });

  this.add.text(120, 300, "PRESS ENTER TO RESTART", {
    font: "16px 'Press Start 2P'",
    fill: "#ffffff"
  });
  
  this.gameWon = true;
  }

}

new Phaser.Game({
  width: 600, // Width of the game in pixels
  height: 600, // Height of the game in pixels
  backgroundColor: "#000000", // The background color (black)
  scene: mainScene, // The name of the scene we created
  physics: { default: "arcade" }, // The physics engine to use
  parent: "game", // Create the game inside the <div id="game">
});
