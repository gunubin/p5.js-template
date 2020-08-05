/* @flow */
import Component from './Component'

export default class P5component extends Component{

  constructor() {
    super();
    window.setup = this.setup.bind(this)
    window.draw = this.draw.bind(this)

  }

  setup() {
  }

  draw() {
  }

}
