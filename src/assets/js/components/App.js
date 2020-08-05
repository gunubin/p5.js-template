import P5component from '../lib/P5component'

const width = 1000
const height = 1000
const r = 200
let t = 0

export default class App extends P5component {

  setup() {
    const canvas = createCanvas(width, height)
    canvas.parent(this.element)
  }

  draw() {
    background(255)

    translate(width / 2, height / 2)
    stroke(0)
    beginShape()
    noFill()

    for (let a = -PI; a < PI; a += 0.01) {
      const x = cos(a + t)
      const y = sin(a)

      vertex(x * r, y * r)
    }
    endShape()


    t += 0.01
  }
}
