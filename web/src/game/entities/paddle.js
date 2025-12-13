export class Paddle {
  constructor(x, y, w, h, speed, canvasWidth) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.speed = speed;
    this.canvasWidth = canvasWidth;
  }
  update(input, dt) {
    if (input.left) this.x -= this.speed * 60 * dt;
    if (input.right) this.x += this.speed * 60 * dt;
    // clamp
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > this.canvasWidth) this.x = this.canvasWidth - this.width;
  }
}
