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
}
