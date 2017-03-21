/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-03-21 10:33:22
 * @modify date 2017-03-21 10:33:22
 * @desc [event, compatible with ie >= 8]
*/

import { closest } from './element.js'

// preserve delegate cb
let delegateCb = {}

let on = (() => {
  if (document.addEventListener) {
    return (elem, type, handler) => {
      if (typeof elem === 'string') { // polyfill selector
        elem = document.querySelector(elem)
      }
      if (elem && type && handler) {
        elem.addEventListener(type, handler, false)
      }
    }
  } else {
    return (elem, type, handler) => {
      if (typeof elem === 'string') { // polyfill selector
        elem = document.querySelector(elem)
      }
      if (elem && type && handler) {
        elem.attachEvent(`on${type}`, handler)
      }
    }
  }
})()

let off = (() => {
  if (document.removeEventListener) {
    return (elem, type, handler) => {
      if (typeof elem === 'string') { // polyfill selector
        elem = document.querySelector(elem)
      }
      if (elem && type) {
        elem.removeEventListener(type, handler, false)
      }
    };
  } else {
    return (elem, type, handler) => {
      if (typeof elem === 'string') { // polyfill selector
        elem = document.querySelector(elem)
      }
      if (elem && type) {
        elem.detachEvent(`on${type}`, handler)
      }
    }
  }
})()

let one = (elem, type, fn) => {
  let handler = () => {
    if (fn) {
      // run fn
      fn.apply(this, arguments)
    }
    off(elem, type, handler)
  }
  on(elem, type, handler)
}

let delegate = (selector, type, handler, parent, isUndelegate) => {
  let handle = (e) => {
    // get event object
    let event = window.event ? window.event : e
    // event.srcElement for ie
    let target = event.target || event.srcElement
    // get delegateTarget & element
    let delegateTarget = closest(target, selector)
    let elem = document.querySelector(selector)
    if (delegateTarget) {
      handler.call(elem, e)
    }
  }
  
  // add parentElem to reduce the bubble numer
  let parentElem = parent || document.getElementsByTagName('body')[0]
  if (!isUndelegate) {
    delegateCb[selector] || (delegateCb[selector] = handle)
    on(parentElem, type, delegateCb[selector])
  } else {
    off(parentElem, type, delegateCb[selector])
    delete delegateCb[selector]
  }
}

let undelegate = (selector, type, handler, parent) => {
  delegate(selector, type, handler, parent, true)
}

export {
  on,
  off,
  one,
  delegate,
  undelegate,
}
