import { GameEngine } from "./game/engine.js";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  canvas.focus();
  const engine = new GameEngine(canvas, {
    rows: 8,
    cols: 8,
    lives: 3,
  });
  engine.start();

  // Wire simple HUD updates
  engine.on("updateHUD", ({ score, level, lives }) => {
    document.getElementById("score").textContent = `Score: ${score}`;
    document.getElementById("level").textContent = `Level: ${level}`;
    document.getElementById("lives").textContent = `Lives: ${lives}`;
    // Update pause indicator
    const pauseHint = engine.state.isPaused ? " [PAUSED]" : "";
    document.title = `Breakout - my-sdd-project${pauseHint}`;
  });
});
