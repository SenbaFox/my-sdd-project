export class Input {
  constructor() {
    this.left = false;
    this.right = false;
    this.pausePressed = false;
    document.addEventListener("keydown", (e) => this._onKeyDown(e));
    document.addEventListener("keyup", (e) => this._onKeyUp(e));
  }
  _onKeyDown(e) {
    if (e.key === "ArrowLeft" || e.key === "a") this.left = true;
    if (e.key === "ArrowRight" || e.key === "d") this.right = true;
    if (e.key === "p" || e.key === "P") {
      this.pausePressed = true;
    }
  }
  _onKeyUp(e) {
    if (e.key === "ArrowLeft" || e.key === "a") this.left = false;
    if (e.key === "ArrowRight" || e.key === "d") this.right = false;
  }
}
