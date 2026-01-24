export class Renderer {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;
  }
  clear(w, h) {
    this.ctx.clearRect(0, 0, w, h);
  }
  renderBlocks(blocks) {
    for (const b of blocks) {
      if (b.destroyed) continue;
      this.ctx.fillStyle = b.damaged ? "#b35" : "#5ac";
      this.ctx.fillRect(b.x, b.y, b.width, b.height);
      this.ctx.strokeStyle = "#012";
      this.ctx.strokeRect(b.x, b.y, b.width, b.height);
    }
  }
  renderPaddle(p) {
    this.ctx.fillStyle = "#eee";
    this.ctx.fillRect(p.x, p.y, p.width, p.height);
  }
  renderBall(ball) {
    this.ctx.beginPath();
    this.ctx.fillStyle = "#ffd";
    this.ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    this.ctx.fill();
  }
  renderPauseText(width, height) {
    // Semi-transparent overlay
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, width, height);
    // Pause text
    this.ctx.fillStyle = "#fff";
    this.ctx.font = "bold 48px system-ui";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText("PAUSED", width / 2, height / 2 - 40);
    this.ctx.font = "16px system-ui";
    this.ctx.fillText("Press P to resume", width / 2, height / 2 + 40);
  }
  renderGameOver(width, height) {
    // Semi-transparent overlay only
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, width, height);
  }
  renderGameClear(width, height) {
    // Semi-transparent overlay only
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.fillRect(0, 0, width, height);
  }
}
