test('destroying a block twice increments score and ball falling decrements lives', async ()=>{
  const mod = await import('../../web/src/game/engine.js');
  const GameEngine = mod.GameEngine;

  // fake canvas with minimal context methods used by Renderer
  const fakeCtx = {
    fillRect(){}, strokeRect(){}, clearRect(){}, beginPath(){}, arc(){}, fill(){}
  };
  const canvas = { width: 400, height: 300, getContext: ()=>fakeCtx };

  const engine = new GameEngine(canvas, {rows:1, cols:1, lives:3});
  // ensure single block
  expect(engine.blocks.length).toBe(1);
  const block = engine.blocks[0];

  // stop ball movement and position it over the block
  engine.ball.vx = 0; engine.ball.vy = 0;
  engine.ball.x = block.x + block.width/2;
  engine.ball.y = block.y + block.height/2;

  const initialScore = engine.state.score;
  // first update -> damage only
  engine.update(0.016);
  expect(engine.state.score).toBe(initialScore);
  expect(block.damaged).toBe(true);
  // second update -> destroyed -> score +1
  engine.update(0.016);
  expect(engine.state.score).toBe(initialScore + 1);
  expect(block.destroyed).toBe(true);

  // test lives decrement when ball falls below screen
  const initialLives = engine.state.lives;
  engine.ball.y = canvas.height + engine.ball.radius + 10;
  engine.update(0.016);
  expect(engine.state.lives).toBe(initialLives - 1);
});
