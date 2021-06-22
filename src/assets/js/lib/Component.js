import p5 from 'p5'

/**
 * Component Class
 */
export default class Component {
  isShared = false
  children = {}
  handlers = new Map()
  container = document.body
  element
  selector
  app

  /**
   * constructor
   */
  constructor(selector) {
    this._mount = this._mount.bind(this)
    this._unmount = this._unmount.bind(this)

    if (selector) {
      this.attach(selector)
    }
  }

  append(component, selector) {
    // for ie. obj.constructor.nameがとれない
    let getClassName = (obj) => {
      if (obj.constructor.name) {
        return obj.constructor.name
      }
      const regex = new RegExp(/^\s*function\s*(\S*)\s*\(/)
      getClassName = (obj) => obj.constructor.toString().match(regex)[1]
      return getClassName(obj)
    }

    const className = getClassName(component)
    this.children[className] = component
    this[className] = component
    if (selector) {
      component.attach(selector)
    }
    return this
  }

  get(name) {
    return this.children[name]
  }

  destroy() {
    Object.keys(this.children).map((key) => {
      const child = this.children[key]
      child.destroy()
      delete this[key]
    })
    this.children = []
    this.destructor()
    this.removeAllEventListeners()
    this._unmount()
  }

  emit(type) {
    // FIXME: polyfill しっかり
    let event = null
    if (typeof Event === 'function') {
      event = new Event(type)
    } else {
      event = document.createEvent('Event')
      event.initEvent(type, true, true)
    }
    this.element.dispatchEvent(event)
  }

  on(type, handler) {
    this.handlers.set(handler, type)
    this.element.addEventListener(type, handler)
  }

  off(type, handler) {
    if (handler) {
      this.handlers.delete(handler)
      this.element.removeEventListener(type, handler)
    } else {
      this.removeAllEventListeners(type)
    }
  }

  removeAllEventListeners(type) {
    const remove = []
    this.handlers.forEach((t, h) => {
      if (!type || (type && t === type)) {
        this.element.removeEventListener(t, h)
        remove.push(h)
      }
    })
    remove.map((r) => {
      this.handlers.delete(r)
    })
  }

  attach(selector) {
    this.selector = selector
    if (!this.selector) {
      throw new ReferenceError('selector is not found.')
    }
    this.element = this._select()
    if (!this.element) {
      throw new ReferenceError(`${selector}: element is not found.`)
    }
    if (this.element) {
      this._mount()
    }
  }

  setup() {
  }

  draw() {

  }

  sketch(p) {
    p.setup = () => this.setup(p)
    p.draw = () => this.draw(p)
  }

  _mount() {
    this.app = new p5(this.sketch.bind(this), this.element)
    this.mount()
  }

  _unmount() {
    this.unmount()
  }

  /**
   * select
   */
  _select(){
    if (typeof this.selector === 'function') {
      return this.selector()
    }
    return this.container && this.container.querySelector(this.selector)
  }

  setContainer(container) {
    this.container = container
  }

  /**
   * mount
   */
  mount() {}

  /**
   * loaded
   */
  loaded() {}

  /**
   * view
   */
  view() {}

  /**
   * willUnmount
   */
  willUnmount() {}

  /**
   * unmount
   */
  unmount() {}

  /**
   * destructor
   */
  destructor() {}
}
