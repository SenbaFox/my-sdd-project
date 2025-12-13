test('Paddle.update moves within bounds based on input', async ()=>{
  const mod = await import('../../web/src/game/entities/paddle.js');
  const Paddle = mod.Paddle;
  const paddle = new Paddle(50, 100, 100, 16, 6, 300);
  // simulate right input for 0.5s
  const input = {left:false, right:true};
  paddle.update(input, 0.5);
  expect(paddle.x).toBeGreaterThan(50);
  // move left beyond boundary
  paddle.x = -20;
  paddle.update({left:false,right:false}, 0);
  expect(paddle.x).toBeGreaterThanOrEqual(0);
});
