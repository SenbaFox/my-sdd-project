test('Ball.update updates position by vx/vy * dt', async ()=>{
  const mod = await import('../../web/src/game/entities/ball.js');
  const Ball = mod.Ball;
  const b = new Ball(0,0,5);
  b.vx = 100; b.vy = 50;
  b.update(0.5); // half second
  expect(b.x).toBeCloseTo(50, 5);
  expect(b.y).toBeCloseTo(25, 5);
});
