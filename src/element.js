/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-03-21 04:18:46
 * @modify date 2017-03-21 04:18:46
 * @desc [element polyfill methods]
*/

let elementProto = window.Element.prototype

let matches = (elem, selector) => {
  function _matches(elem, selector) {
    let elems = (elem.document || elem.ownerDocument).querySelectorAll(selector)
    let index = 0
    while (elems[index] && elems[index] !== elem) {
      ++index
    }
    return Boolean(elems[index])
  }
  if (elementProto.msMatchesSelector || elementProto.mozMatchesSelector || elementProto.webkitMatchesSelector) {
    return elem.msMatchesSelector(selector) || elem.mozMatchesSelector(selector) || elem.webkitMatchesSelector(selector)
  }
  return _matches(elem, selector)
}

let closest = (elem, selector) => {
  function _closest(selector) {
    while (elem && elem.nodeType === 1) {
      if (elem.matches(selector)) {
        return elem
      }
      elem = elem.parentNode
    }
    return null
  }
  if (elementProto.closest) {
    return elem.closest(selector)
  }
  return _closest(elem, selector)
}

export {
  matches,
  closest,
}

