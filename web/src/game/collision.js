/**
 * Collision detection and response system
 */
class CollisionHandler {
  /**
   * Check circle-rect collision (ball vs paddle/blocks)
   */
  static checkCircleRect(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.centerX, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.centerY, rect.y + rect.height));

    const distanceX = circle.centerX - closestX;
    const distanceY = circle.centerY - closestY;
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    return distance < circle.radius;
  }

  /**
   * Get collision side for circle-rect collision
   */
  static getCollisionSide(circle, rect) {
    const closestX = Math.max(rect.x, Math.min(circle.centerX, rect.x + rect.width));
    const closestY = Math.max(rect.y, Math.min(circle.centerY, rect.y + rect.height));

    const distanceX = circle.centerX - closestX;
    const distanceY = circle.centerY - closestY;

    if (Math.abs(distanceX) > Math.abs(distanceY)) {
      return distanceX > 0 ? "right" : "left";
    } else {
      return distanceY > 0 ? "bottom" : "top";
    }
  }

  /**
   * Check wall collision (ball vs game boundaries)
   */
  static checkWallCollision(ball, width, height) {
    const collisions = {
      left: ball.x - ball.radius < 0,
      right: ball.x + ball.radius > width,
      top: ball.y - ball.radius < 0,
      bottom: ball.y + ball.radius > height,
    };
    return collisions;
  }

  /**
   * Handle ball-wall collisions
   */
  static handleWallCollision(ball, width, height) {
    const collisions = this.checkWallCollision(ball, width, height);

    if (collisions.left || collisions.right) {
      ball.reverseX();
      // Clamp position
      if (collisions.left) ball.x = ball.radius;
      if (collisions.right) ball.x = width - ball.radius;
    }

    if (collisions.top) {
      ball.reverseY();
      ball.y = ball.radius;
    }

    // Check if ball fell off bottom (game over condition)
    return collisions.bottom;
  }

  /**
   * Handle ball-paddle collision with angle reflection
   */
  static handlePaddleCollision(ball, paddle) {
    if (!this.checkCircleRect(ball, paddle.getBounds())) {
      return false;
    }

    const side = this.getCollisionSide(ball, paddle.getBounds());

    if (side === "top" || side === "bottom") {
      ball.reverseY();

      // Add angular reflection based on paddle position
      const paddleCenter = paddle.getCenter();
      const ballToPaddleCenter = ball.x - paddleCenter;
      const maxAngle = Math.PI / 4; // 45 degrees
      const angleMultiplier = (ballToPaddleCenter / (paddle.width / 2)) * maxAngle;

      const currentSpeed = Math.sqrt(ball.vx * ball.vx + ball.vy * ball.vy);
      ball.setAngle(angleMultiplier, currentSpeed);

      // Clamp ball position to prevent sticking
      if (side === "top") {
        ball.y = paddle.y - ball.radius;
      } else {
        ball.y = paddle.y + paddle.height + ball.radius;
      }
    } else {
      ball.reverseX();
    }

    return true;
  }

  /**
   * Handle ball-block collision
   */
  static handleBlockCollision(ball, block) {
    if (!this.checkCircleRect(ball, block.getBounds())) {
      return false;
    }

    const side = this.getCollisionSide(ball, block.getBounds());

    if (side === "left" || side === "right") {
      ball.reverseX();
    } else {
      ball.reverseY();
    }

    return true;
  }
}

export default CollisionHandler;
