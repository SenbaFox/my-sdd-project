export class GameState {
  constructor(opts) {
    this.score = 0;
    this.level = 1;
    this.lives = opts.lives || 3;
    this.blocksDestroyed = 0;
    this.isPaused = false;
    this.ballSpeedMultiplier = 1.0;
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
  }
  togglePause() {
    this.isPaused = !this.isPaused;
  }
}
