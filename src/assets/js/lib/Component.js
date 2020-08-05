/* @flow */

export type Selector = string | () => HTMLElement

/**
 * Component Class
 */
export default class Component {
  children: { [key: string]: Component } = {}
  handlers: Map = new Map()
  container: ?HTMLElement = document.body
  element: ?HTMLElement
  className: string
  selector: Selector

  /**
   * constructor
   */
  constructor(selector: Selector = null) {
    this._mount = this._mount.bind(this)
    this._unmount = this._unmount.bind(this)

    if(selector) {
      this.attach(selector)
    }
  }

  append(component: Component, selector?: Selector) {
    // for ie. obj.constructor.nameがとれない
    let getClassName = obj => {
      if (obj.constructor.name) {
        return obj.constructor.name
      }
      const regex = new RegExp(/^\s*function\s*(\S*)\s*\(/)
      getClassName = obj => obj.constructor.toString().match(regex)[1]
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

  get(name: string): Component {
    return this.children[name]
  }

  destroy() {
    Object.keys(this.children).map(key => {
      const child = this.children[key]
      child.destroy()
      delete this[key]
    })
    this.children = []
    this.destructor()
    this.removeAllEventListeners()
    this._unmount()
  }

  emit(type: string) {
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

  on(type: string, handler: Function) {
    this.handlers.set(handler, type)
    this.element.addEventListener(type, handler)
  }

  off(type: string, handler: Function) {
    if (handler) {
      this.handlers.delete(handler)
      this.element.removeEventListener(type, handler)
    } else {
      this.removeAllEventListeners(type)
    }
  }

  removeAllEventListeners(type?: string) {
    const remove = []
    this.handlers.forEach((t, h) => {
      if (!type || (
        type && t === type
      )) {
        this.element.removeEventListener(t, h)
        remove.push(h)
      }
    })
    remove.map(r => {
      this.handlers.delete(r)
    })
  }

  attach(selector: Selector) {
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

  _mount() {
    this.mount()
  }

  _unmount() {
    this.unmount()
  }


  /**
   * select
   */
  _select(): ?HTMLElement {
    if (typeof this.selector === 'function') {
      return this.selector()
    }
    return this.container && this.container.querySelector(this.selector)
  }

  setContainer(container?: HTMLElement) {
    this.container = container
  }

  /**
   * mount
   */
  mount() {
  }
  
  /**
   * loaded
   */
  loaded() {
  }

  /**
   * willUnmount
   */
  willUnmount() {
  }

  /**
   * unmount
   */
  unmount() {
  }

  /**
   * destructor
   */
  destructor() {
  }

}
