export class GameState {
  constructor(opts) {
    this.score = 0;
    this.level = 1;
    this.lives = opts.lives || 3;
    this.blocksDestroyed = 0;
    this.isPaused = false;
    this.ballSpeedMultiplier = 1.0;
    this.isGameOver = false;
    this.isGameClear = false;
    this.startTime = Date.now();
  }
  
  getElapsedTime() {
    // If game is over or cleared, return frozen time
    if (this.isGameOver || this.isGameClear) {
      if (!this.freezeTime) {
        this.freezeTime = Date.now();
      }
      return Math.floor((this.freezeTime - this.startTime) / 1000);
    }
    return Math.floor((Date.now() - this.startTime) / 1000);
  }
  incrementScore() {
    this.score += 1;
    this.blocksDestroyed += 1;
  }
  checkLevelUp() {
    return this.blocksDestroyed % 5 === 0;
  }
  levelUp() {
    this.level += 1;
  }
  loseLife() {
    this.lives -= 1;
    if (this.lives <= 0) {
      this.isGameOver = true;
    }
  }
  togglePause() {
    this.isPaused = !this.isPaused;
  }
  reset() {
    this.freezeTime = null;
  }
}
