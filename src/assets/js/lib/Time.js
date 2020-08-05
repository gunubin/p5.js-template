/* @flow */

// FIXME: global
window.time = window.time || null

export default class Time {

  _time = {}

  static create() {
    if (window.time) {
      return window.time
    }
    return window.time = new Time()
  }

  start(key: string) {
    key = key || '0'
    this._time[key] = new Date().getTime()
    return this._time[key]
  }

  end(key) {
    key = key || '0'
    const now = new Date().getTime()
    const time = this._time[key]
    return now - time
  }

}
