export class Input {
  constructor() {
    this.left = false;
    this.right = false;
    window.addEventListener("keydown", (e) => this._onKey(e, true));
    window.addEventListener("keyup", (e) => this._onKey(e, false));
  }
  _onKey(e, down) {
    if (e.key === "ArrowLeft" || e.key === "a") this.left = down;
    if (e.key === "ArrowRight" || e.key === "d") this.right = down;
  }
}
