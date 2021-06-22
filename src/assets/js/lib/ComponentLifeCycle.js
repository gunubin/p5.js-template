import Component from './Component'
import ComponentArray from './ComponentArray'

/**
 * ComponentLifeCycle
 *
 * pjaxよるページ遷移時にComponentを再生成する
 */
export default class ComponentLifeCycle {
  _components = []
  _map = {}
  _shared = {}

  // shared: 共通コンポーネントでページ遷移で更新されない
  constructor(shared, map) {
    this._shared = shared
    this._map = map
  }

  _willUnmount() {
    this._components.map((c) => {
      c.willUnmount()
    })
  }

  _destruct() {
    this._components.map((c) => {
      c.destroy()
    })
    this._components = this._components.filter((c) => {
      return c.isShared
    })
  }

  _setupSharedComponent() {
    Object.keys(this._shared).map((key) => {
      const ComponentClass = this._shared[key]
      const c = new ComponentArray(() => new ComponentClass(), key)
      c.isShared = true
      this._components.push(c)
    })
  }

  _construct() {
    Object.keys(this._map).map((key) => {
      const ComponentClass = this._map[key]
      const c = new ComponentArray(() => new ComponentClass(), key)
      this._components.push(c)
    })
  }

  _loaded() {
    this._components.map((c) => {
      c.loaded()
    })
  }

  _view() {
    this._components.map((c) => {
      c.view()
    })
  }

  start() {
    this._setupSharedComponent()
    this._construct()
  }

  loaded() {
    this._loaded()
  }

  view() {
    this._view()
  }
}
