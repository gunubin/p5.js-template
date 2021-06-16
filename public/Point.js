class Point {
  rez
  x = 0
  y = 0
  col = 0
  row = 0
  color = 0
  weight = 0

  constructor(rez, col, row) {
    this.rez = rez
    this.col = col
    this.row = row
    this.x = col * rez
    this.y = row * rez
    // textFont('Georgia');
    textSize(10)
    // textStyle(NORMAL);

  }

  setColor(color) {
    this.color = color
  }

  setWeight(weight) {
    this.weight = weight
    this.color = this.weight > 1.0 ? 1 : 0
  }

  update() {
    stroke(0, 50)
    text(Math.floor(this.weight*100)/100, this.x + 5, this.y + 10)
    stroke(this.color * 255, 50)
    strokeWeight(3)
    point(this.x, this.y)
  }


}
