import { GameEngine } from "./game/engine.js";

window.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("game-canvas");
  const overlay = document.getElementById("overlay");
  const restartButton = document.getElementById("restart-button");
  
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
    // Update pause/game state indicator
    let suffix = "";
    if (engine.state.isGameClear) {
      suffix = " [GAME CLEAR]";
    } else if (engine.state.isGameOver) {
      suffix = " [GAME OVER]";
    } else if (engine.state.isPaused) {
      suffix = " [PAUSED]";
    }
    document.title = `Breakout - my-sdd-project${suffix}`;
  });

  // Handle game end (clear or gameover) to show overlay with stats
  engine.on("gameEnd", ({ type, score, level }) => {
    const elapsedTime = engine.state.getElapsedTime();
    const minutes = Math.floor(elapsedTime / 60);
    const seconds = elapsedTime % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    
    const overlay = document.getElementById("overlay");
    const gameEndContent = document.getElementById("game-end-content");
    const endTitle = document.getElementById("end-title");
    const endStats = document.getElementById("end-stats");
    
    if (type === "clear") {
      endTitle.textContent = "Congratulations!";
      endStats.innerHTML = `
        <p>Time: ${timeStr}</p>
      `;
      gameEndContent.className = "game-end-content clear";
    } else {
      endTitle.textContent = "Game Over";
      endStats.innerHTML = `
        <p>Final Score: ${score}</p>
        <p>Level: ${level}</p>
      `;
      gameEndContent.className = "game-end-content gameover";
    }
    
    overlay.classList.remove("hidden");
    canvas.blur();
  });

  // Restart button handler
  restartButton.addEventListener("click", () => {
    overlay.classList.add("hidden");
    engine.reset();
    engine.start();
    canvas.focus();
  });

  // Reset via R key during game end
  engine.on("resetRequested", () => {
    overlay.classList.add("hidden");
    engine.reset();
    engine.start();
    canvas.focus();
  });
});
