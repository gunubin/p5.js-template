const width = window.innerWidth
const height = window.innerHeight
const r = 300
let t = 1.90
const n = 2

function setup() {
  createCanvas(width, height)

  stroke(0)
  strokeWeight(3)
  noFill()
}

function draw() {
  background(255)

  translate(width / 2, height / 2)

  for (let i = 1; i < n; i++) {
    beginShape()
    for (let a = -PI; a < PI; a += 0.10 / r) {
      const x = cos(a) + 0.5 * cos(a*5)
      const y = sin(a) + 0.5 * sin(a*-5)
      const d = sin(a * 3.0 + t) * 3
      const dx = exp(-sq(d)) * cos(TAU * 100 * a + (t*2)) * 70
      const dy = exp(-sq(d)) * sin(TAU * 100 * a + (t*2)) * 70

      // point(x * r, y * r);
      // stroke(255 * a / TAU, 100, 100)
      vertex(x * r - dx, y * r - dy)
    }
    endShape()
  }

  t += 0.005
  // noLoop();
}
