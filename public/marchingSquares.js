const width = window.innerWidth
const height = window.innerHeight
const rez = 50
const cols = 1 + Math.floor(width / rez)
const rows = 1 + Math.floor(height / rez)
const grid = []
let g
let circles = []
const circleCount = 10
const stickiness = 1.5
let mouseCircle = null


function doline(p1, p2) {
  line(p1.x, p1.y, p2.x, p2.y)
}

const stateMap = (a, b, c, d) => ({
  0: () => {
  },
  1: () => doline(c, d),
  2: () => doline(b, c),
  3: () => doline(b, d),
  4: () => doline(a, b),
  5: () => {
    doline(a, d)
    doline(b, c)
  },
  6: () => doline(a, c),
  7: () => doline(a, d),
  8: () => doline(a, d),
  9: () => doline(a, c),
  10: () => {
    doline(a, b)
    doline(c, d)
  },
  11: () => doline(a, b),
  12: () => doline(b, d),
  13: () => doline(b, c),
  14: () => doline(c, d),
  15: () => {
  },
  NaN: () => {
  },
})

function setup() {
  createCanvas(width, height)
  g = createGraphics(width, height)
  g.pixelDensity(1)


  stroke(0)
  strokeWeight(3)
  noFill()

  circles = [...Array(circleCount).keys()].map(() => {
    return new Circle(g, width, height)
  })

  mouseCircle = new Circle(g, width, height)
  mouseCircle.isMouse = true

  circles.push(mouseCircle)

  for (let i = 0; i < cols; i++) {
    grid[i] = []
    for (let j = 0; j < rows; j++) {
      grid[i][j] = new Point(rez, i, j)
    }
  }
}

function draw() {
  background(127)

  g.clear()
  circles.map(c => c.update())
  mouseCircle.x = mouseX
  mouseCircle.y = mouseY

  // g.loadPixels()
  image(g, 0, 0)

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let weight = 0
      circles.map(c => {
        const d = dist(i * rez, j * rez, c.x, c.y)
        if (c.r * stickiness > d) {
          const distanceRatio = c.r / d
          weight += distanceRatio
        }
      })
      grid[i][j].setWeight(weight)
      // let pixelIndex = (i + j * width) * 4
      // grid[i][j].setColor(g.pixels[pixelIndex * rez] / 255)
    }
  }

  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {

      grid[i][j].update()

      const x = i * rez
      const y = j * rez

      const pointA = grid[i][j]
      const pointB = grid[i + 1][j]
      const pointC = grid[i + 1][j + 1]
      const pointD = grid[i][j + 1]

      const aWeight = linearstep(pointA.weight, pointB.weight, 1.0)
      const bWeight = linearstep(pointB.weight, pointC.weight, 1.0)
      const cWeight = linearstep(pointD.weight, pointC.weight, 1.0)
      const dWeight = linearstep(pointA.weight, pointD.weight, 1.0)

      const a = {x: x + rez * aWeight, y}
      const b = {x: x + rez, y: y + rez * bWeight}
      const c = {x: x + rez * cWeight, y: y + rez}
      const d = {x, y: y + rez * dWeight}

      const state = getState(
        ceil(grid[i][j].color),
        ceil(grid[i + 1][j].color),
        ceil(grid[i + 1][j + 1].color),
        ceil(grid[i][j + 1].color)
      )
      stroke(255)
      strokeWeight(1)
      stateMap(a, b, c, d)[state]()

    }
  }

  // noLoop()
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1
}
