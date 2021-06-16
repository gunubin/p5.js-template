class Circle {
  x = 0
  y = 0
  dx = random(-2, 2)
  dy = random(-2, 2)
  r = random(50, 150)
  isMouse = false

  // r = 100
  // dx = 1
  // dy = 1

  constructor(graphic, width, height) {
    this.graphic = graphic
    this.x = random(width)
    this.y = random(height)

    // this.x = width / 2
    // this.y = height / 2
  }

  update() {
    if (!this.isMouse) {
      this.x += this.dx
      this.y += this.dy
      if (this.x < 0) {
        this.dx = -this.dx
      }
      if (this.x > width) {
        this.dx = -this.dx
      }
      if (this.y < 0) {
        this.dy = -this.dy
      }
      if (this.y > width) {
        this.dy = -this.dy
      }
    }
    this.graphic.fill(255, 10)
    this.graphic.noStroke()
    this.graphic.ellipse(this.x, this.y, this.r * 2, this.r * 2)
  }


}
