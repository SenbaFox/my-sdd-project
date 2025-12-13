export class Block {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.health = 2;
    this.damaged = false;
    this.destroyed = false;
  }
  hit() {
    this.health -= 1;
    if (this.health <= 1) this.damaged = true;
    if (this.health <= 0) {
      this.destroyed = true;
    }
  }
}
