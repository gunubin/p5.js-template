import Component from './Component'

/**
 * ComponentArray Class
 */
export default class ComponentArray {
  isShared = false
  components = []
  _componentCreator

  constructor(componentCreator, selector = null) {
    this._componentCreator = componentCreator
    if (selector) {
      this.attach(selector)
    }
  }

  _select() {
    return typeof this._selector === 'function'
      ? this._selector()
      : document.querySelectorAll(this._selector)
  }

  on(type, handler) {
    this.components.map((c) => {
      c.on(type, handler)
    })
  }

  push(...args) {
    return this.components.push(...args)
  }

  filter(...args) {
    return this.components.filter(...args)
  }

  every(...args) {
    return this.components.every(...args)
  }

  map(...args) {
    return this.components.map(...args)
  }

  willUnmount() {
    this.components.map((c) => {
      c.willUnmount()
    })
  }

  destroy() {
    if (this.isShared) {
      return
    }
    this.components.map((c) => {
      c.destroy()
    })
    this.components = []
  }

  attach(selector) {
    this._selector = selector
    this._elements = this._select()
    const elements = [...this._elements]
    elements.map((e) => {
      const component = new this._componentCreator()
      component.attach(() => e)
      this.components.push(component)
    })
  }

  loaded() {
    this.components.map((c) => {
      c.loaded()
    })
  }

  view() {
    this.components.map((c) => {
      c.view()
    })
  }
}
