import {Circle} from './Circle'
import {Point} from './Point'
import {linearstep} from '../../utils'

const width = window.innerWidth
const height = window.innerHeight
const rez = 30
const cols = 1 + Math.floor(width / rez)
const rows = 1 + Math.floor(height / rez)
const grid = []
let g
let circles = []
const circleCount = 10
let mouseCircle = null

function doline(p1, p2, points) {
  if (p1 && p2) {
    line(p1.x, p1.y, p2.x, p2.y)
  }
  noStroke()
  fill(255)
  beginShape()
  points && points.map(point => {
    vertex(point['x'], point['y'])
    p1 && vertex(p1.x, p1.y)
    p2 && vertex(p2.x, p2.y)
  })
  endShape(CLOSE)
}

const stateMap = (a, b, c, d, points) => ({
  0: () => {
  },
  1: () => doline(c, d, points),
  2: () => doline(b, c, points),
  3: () => doline(b, d, points),
  4: () => doline(a, b, points),
  5: () => {
    doline(a, d)
    doline(b, c)
  },
  6: () => doline(a, c, points),
  7: () => doline(a, d, points),
  8: () => doline(a, d, points),
  9: () => doline(a, c, points),
  10: () => {
    doline(a, b)
    doline(c, d)
  },
  11: () => doline(a, b, points),
  12: () => doline(b, d, points),
  13: () => doline(b, c, points),
  14: () => doline(c, d, points),
  15: () => {
    doline(null, null, points)
  },
  NaN: () => {
  },
})

export function setup() {
  createCanvas(width, height, P2D)
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

export function draw() {
  // background(127)
  background(0)

  g.clear()
  circles.map(c => c.update())
  mouseCircle.x = mouseX
  mouseCircle.y = mouseY

  // g.loadPixels()
  // image(g, 0, 0)

  for (let j = 0; j < rows; j++) {
    for (let i = 0; i < cols; i++) {
      let weight = 0
      let count = 0
      circles.map(c => {
        const d = dist(i * rez, j * rez, c.x, c.y)
        if (c.r * 2 > d) {
          count++
        }
        const distanceRatio = c.r / d
        weight += distanceRatio * 0.5
      })
      grid[i][j].setWeight(weight)
      grid[i][j].setCount(count)
      // let pixelIndex = (i + j * width) * 4
      // grid[i][j].setColor(g.pixels[pixelIndex * rez] / 255)
    }
  }

  for (let j = 0; j < rows - 1; j++) {
    for (let i = 0; i < cols - 1; i++) {

      // grid[i][j].update()

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
      const count = grid[i][j].count
      // colorMode(HSB)
      // stroke(map(count, 3, 1, 1, 200), 50, 90)
      // strokeWeight(count*8+1)
      // fill(0)
      const points = []
      if (ceil(grid[i][j].color) >= 1) {
        points.push(grid[i][j])
      }
      if (ceil(grid[i + 1][j].color) >= 1) {
        points.push(grid[i + 1][j])
      }
      if (ceil(grid[i + 1][j + 1].color) >= 1) {
        points.push(grid[i + 1][j + 1])
      }
      if (ceil(grid[i][j + 1].color) >= 1) {
        points.push(grid[i][j + 1])
      }
      stroke(0)
      stateMap(a, b, c, d, points)[state]()

      colorMode(RGB)

    }
  }

  // noLoop()
}

function getState(a, b, c, d) {
  return a * 8 + b * 4 + c * 2 + d * 1
}
