import { GameLoop } from "./loop.js";
import { Renderer } from "./renderer.js";
import { Input } from "./input.js";
import { createBlocks } from "./scene.js";
import { Ball } from "./entities/ball.js";
import { Paddle } from "./entities/paddle.js";
import { GameState } from "./state.js";

export class GameEngine {
  constructor(canvas, opts = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");
    this.opts = Object.assign({ rows: 8, cols: 8, lives: 3 }, opts);
    this.renderer = new Renderer(this.ctx, canvas.width, canvas.height);
    this.input = new Input();
    this.state = new GameState(this.opts);
    this.blocks = createBlocks(this.opts.rows, this.opts.cols, canvas.width);
    this.paddle = new Paddle(canvas.width / 2 - 50, canvas.height - 40, 100, 16, 6, canvas.width);
    this.ball = new Ball(canvas.width / 2, canvas.height - 60, 6);
    this.loop = new GameLoop((dt) => this.update(dt));
    this._listeners = {};
  }

  start() {
    this.loop.start();
  }

  stop() {
    this.loop.stop();
  }

  reset() {
    this.state = new GameState(this.opts);
    this.blocks = createBlocks(this.opts.rows, this.opts.cols, this.canvas.width);
    this.paddle = new Paddle(
      this.canvas.width / 2 - 50,
      this.canvas.height - 40,
      100,
      16,
      6,
      this.canvas.width
    );
    this.ball = new Ball(this.canvas.width / 2, this.canvas.height - 60, 6);
    this._gameOverEmitted = false;
  }

  update(dt) {
    // check reset input first
    if (this.input.resetPressed && (this.state.isGameOver || this.state.isGameClear)) {
      this.input.resetPressed = false;
      this.emit("resetRequested");
      return;
    }

    // check pause input first (even if paused)
    if (this.input.pausePressed) {
      this.state.togglePause();
      this.input.pausePressed = false;
      this.emit("updateHUD", {
        score: this.state.score,
        level: this.state.level,
        lives: this.state.lives,
      });
      // Always render after pause toggle
      this.render();
      return;
    }

    // skip game update if paused, game over, or game clear
    if (this.state.isPaused || this.state.isGameOver || this.state.isGameClear) {
      this.render();
      return;
    }

    // update inputs
    this.paddle.update(this.input, dt);
    this.ball.update(dt);

    // simple boundary collision
    if (this.ball.x - this.ball.radius < 0 || this.ball.x + this.ball.radius > this.canvas.width) {
      this.ball.vx *= -1;
    }
    if (this.ball.y - this.ball.radius < 0) {
      this.ball.vy *= -1;
    }

    // paddle collision
    if (this.ball.collidesWithRect(this.paddle)) {
      this.ball.bounceFromPaddle(this.paddle);
    }

    // blocks collision
    for (const block of this.blocks) {
      if (!block.destroyed && this.ball.collidesWithRect(block)) {
        block.hit();
        this.ball.vy *= -1;
        if (block.destroyed) {
          this.state.incrementScore();
          if (this.state.checkLevelUp()) {
            this.state.levelUp();
            this.state.ballSpeedMultiplier *= 1.1;
            this.ball.speedUp(1.1);
          }
        }
      }
    }

    // bottom fall
    if (this.ball.y - this.ball.radius > this.canvas.height) {
      this.state.loseLife();
      this.ball.reset(this.canvas.width / 2, this.canvas.height - 60);
      // Re-apply current speed multiplier
      this.ball.speedUp(this.state.ballSpeedMultiplier);
    }

    // check if all blocks destroyed
    const allBlocksDestroyed = this.blocks.every((b) => b.destroyed);
    if (allBlocksDestroyed) {
      this.state.isGameClear = true;
      this.emit("gameEnd", { type: "clear", score: this.state.score, level: this.state.level });
    }

    // emit game over event if game just ended
    if (this.state.isGameOver && this.state.lives === 0) {
      // Check if we haven't already emitted
      if (!this._gameOverEmitted) {
        this._gameOverEmitted = true;
        this.emit("gameEnd", {
          type: "gameover",
          score: this.state.score,
          level: this.state.level,
        });
      }
    }

    // emit HUD
    this.emit("updateHUD", {
      score: this.state.score,
      level: this.state.level,
      lives: this.state.lives,
    });

    // render
    this.render();
  }

  render() {
    this.renderer.clear(this.canvas.width, this.canvas.height);
    this.renderer.renderBlocks(this.blocks);
    this.renderer.renderPaddle(this.paddle);
    this.renderer.renderBall(this.ball);
    if (this.state.isGameClear) {
      this.renderer.renderGameClear(this.canvas.width, this.canvas.height);
    } else if (this.state.isGameOver) {
      this.renderer.renderGameOver(this.canvas.width, this.canvas.height);
    } else if (this.state.isPaused) {
      this.renderer.renderPauseText(this.canvas.width, this.canvas.height);
    }
  }

  on(name, fn) {
    this._listeners[name] = this._listeners[name] || [];
    this._listeners[name].push(fn);
  }
  emit(name, payload) {
    (this._listeners[name] || []).forEach((fn) => fn(payload));
  }
}
