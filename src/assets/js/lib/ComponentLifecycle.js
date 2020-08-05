/* @flow */
import Component from './Component'
import ComponentArray from './ComponentArray'

type ComponentCreator = Class<Component> | (() => Component)

type ComponentMap = {[selector: string]: ComponentCreator}

export default class ComponentLifecycle {
  _components: Component[] = []

  constructor(map: ComponentMap) {
    this._map = map
  }

  _construct() {
    Object.keys(this._map).map(key => {
      const ComponentClass = this._map[key]
      const c = new ComponentArray(() => new ComponentClass(), key)
      this._components.push(c)
    })
  }

  _loaded() {
    this._components.map(c => {
      c.loaded()
    })
  }

  start() {
    this._construct()
  }

  loaded() {
    this._loaded()
  }

}
