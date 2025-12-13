import { Block } from "./entities/block.js";

export function createBlocks(rows, cols, canvasWidth) {
  const blocks = [];
  const padding = 8;
  const totalWidth = canvasWidth - padding * 2;
  const blockWidth = Math.floor(totalWidth / cols) - 4;
  const blockHeight = 18;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = padding + c * (blockWidth + 4);
      const y = padding + r * (blockHeight + 6);
      blocks.push(new Block(x, y, blockWidth, blockHeight));
    }
  }
  return blocks;
}
