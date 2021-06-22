import Component from '../lib/Component'

export class Test extends Component {

  setup(p) {
    p.createCanvas(windowWidth, windowHeight)
    p.background(0)
  }

  draw(p) {
    p.fill(255)
    p.ellipse(p.mouseX, p.mouseY, 80, 80)
  }
}
