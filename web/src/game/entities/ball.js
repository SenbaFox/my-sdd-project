export class Ball {
  constructor(x, y, r) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.vx = 120;
    this.vy = -160; // pixels/sec
  }
  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;
  }
  collidesWithRect(rect) {
    // circle-rect collision simple approximation
    const distX = Math.abs(this.x - (rect.x + rect.width / 2));
    const distY = Math.abs(this.y - (rect.y + rect.height / 2));
    if (distX > rect.width / 2 + this.radius) return false;
    if (distY > rect.height / 2 + this.radius) return false;
    if (distX <= rect.width / 2) return true;
    if (distY <= rect.height / 2) return true;
    const dx = distX - rect.width / 2;
    const dy = distY - rect.height / 2;
    return dx * dx + dy * dy <= this.radius * this.radius;
  }
  bounceFromPaddle(paddle) {
    this.vy = -Math.abs(this.vy);
    // adjust based on paddle movement
    const hitPos = (this.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
    this.vx += hitPos * 40;
  }
  reset(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 120;
    this.vy = -160;
  }
  speedUp(mult) {
    this.vx *= mult;
    this.vy *= mult;
  }
}
