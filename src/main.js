import Phaser from 'phaser';

import startImg from './assets/bri_big_anim_start.png';
import middleImg from './assets/bri_big_anim_middle.png';
import finishImg from './assets/bri_big_anim_finish.png';

class Brilliant extends Phaser.Scene {
  constructor() {
    super();
  }

  preload() {
    this.load.spritesheet('brilliant_start', startImg, { frameWidth: 392, frameHeight: 370 });
    this.load.spritesheet('brilliant_middle', middleImg, { frameWidth: 449, frameHeight: 432 });
    this.load.spritesheet('brilliant_end', finishImg, { frameWidth: 326, frameHeight: 335 });
  }

  create() {
    this.anims.create({
      key: 'start',
      frames: this.anims.generateFrameNumbers('brilliant_start'),
      frameRate: 16,
    });

    this.anims.create({
      key: 'middle',
      frames: this.anims.generateFrameNumbers('brilliant_middle'),
      frameRate: 16,
    });

    this.anims.create({
      key: 'finish',
      frames: this.anims.generateFrameNumbers('brilliant_end'),
      frameRate: 16,
    });

    const spriteStart = this.add.sprite(550, 380, 'brilliant_start').setScale(0.1).play({ key: 'start', repeat: 3 });

    const start = this.tweens.add({
      targets: spriteStart,
      scale: 1,
      ease: 'linear',
      onComplete: () => this.onCompleteHandler1(start.targets),
    });
  }

  onCompleteHandler1(targets) {
    targets[0].setScale(0);
    const spriteMiddle = this.add.sprite(550, 380, 'brilliant_middle').setScale(0.9).play({ key: 'middle', repeat: 4 });

    const middle = this.tweens.add({
      targets: spriteMiddle,
      scale: 0.9,
      duration: 1000,
      ease: 'ease-in',
      onComplete: () => this.onCompleteHandler2(middle.targets),
    });
  }

  onCompleteHandler2(targets) {
    targets[0].setScale(0);
    const spriteFinish = this.add.sprite(550, 380, 'brilliant_finish').setScale(0.9).play({ key: 'finish', repeat: 3 });

    const finish = this.tweens.add({
      targets: spriteFinish,
      scale: 0.2,
      y: 100,
      x: 50,
      duration: 920,
      ease: 'ease-in',

      onComplete: () => this.onCompleteHandler3(finish.targets),
    });
  }

  onCompleteHandler3(targets) {
    targets[0].setScale(0);
    const spriteEnd = this.add.sprite(50, 100, 'brilliant_middle').setScale(0.15).play({ key: 'middle', repeat: 2 });

    this.tweens.add({
      targets: spriteEnd,
      scale: 0.15,
      y: 100,
      x: 50,
      duration: 300,
      ease: 'linear',
    });
  }
}

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1200,
  height: 800,
  pixelArt: true,
  scene: Brilliant,
};

const game = new Phaser.Game(config);
