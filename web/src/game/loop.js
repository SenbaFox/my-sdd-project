export class GameLoop {
  constructor(updateFn) {
    this.updateFn = updateFn;
    this._running = false;
    this._last = 0;
    this._bound = (t) => this._tick(t);
  }
  start() {
    if (this._running) return;
    this._running = true;
    this._last = performance.now();
    requestAnimationFrame(this._bound);
  }
  stop() {
    this._running = false;
  }
  _tick(now) {
    if (!this._running) return;
    const dt = (now - this._last) / 1000; // seconds
    this._last = now;
    this.updateFn(dt);
    requestAnimationFrame(this._bound);
  }
}
