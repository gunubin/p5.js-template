/* @flow */
// FIXME: static methodやめる
export function zeroFill(length: number, number: number) {
  return (Array(length).join('0') + number).slice(-length)
}

export function sleep(msec: number) {
  return new Promise(resolve => setTimeout(resolve, msec))
}

export function randomRange(min: number, max: number) {
  return Math.random() * (max - min + 1) + min
}

export const clip = (val, min, max) => Math.max(min, Math.min(val, max))

export const modifier = () => {
  let _key = ''
  return function (key, callback) {
    if (_key !== key) {
      _key = key
      callback && callback()
    }
  }
}


export default class Utils {
  
  static getParams(name: string) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]")
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search)
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "))
  }
  
  static getOriginUrl() {
    const {origin, protocol, hostname, port} = location
    return origin ? origin : `${protocol}//${hostname}${port && ':' + port}`
  }
  
  static getFullUrl() {
    const {pathname} = location
    return `${this.getOriginUrl()}/${pathname}`
  }
  
  // 近似値
  static closestNumber(counts, num) {
    return counts.reduce(function (prev, curr) {
      return (Math.abs(curr - num) < Math.abs(prev - num) ? curr : prev)
    })
  }
  
  /**
   * hrefがhoge#accessになっているかどうか
   * @param href
   */
  static isCurrentHashLink(href: string): boolean {
    const {pathname} = location
    return pathname !== '/' && href.includes(pathname) && href.includes('#')
  }
  
  /**
   * dispatchEvent
   * @param type
   */
  static dispatchEvent(type: string, element: HTMLElement) {
    if (typeof Event === 'function') {
      event = new Event(type)
    } else {
      event = document.createEvent('Event')
      event.initEvent(type, true, true)
    }
    element.dispatchEvent(event)
  }
  
}
