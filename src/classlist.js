/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-03-21 08:18:04
 * @modify date 2017-03-21 08:18:04
 * @desc [classlist methods]
*/

import { indexOf } from './polyfill.js'
import { selector2dom } from './element.js'

let hasClass = (elem, className) => {
  elem = selector2dom(elem)
  // element/className not defined and className contains space will return false
  if (!elem || !className || indexOf(className, ' ') !== -1) return false
  if (elem.classList) {
    return elem.classList.contains(className)
  }
  return indexOf(elem.className, className) > -1
}

let addClass = (elem, className) => {
  elem = selector2dom(elem)
  if (!elem || !className) return
  let classStr = elem.className
  let classnames = (className || '').split(' ')

  for (let i = 0, len = classnames.length; i < len; i++) {
    let classname = classnames[i]
    if (classname) {
      if (elem.classList) {
        elem.classList.add(classname)
      } else {
        if (!hasClass(elem, classname)) {
          classStr += ` ${classname}` // use a space to split classnames
        }
      }
    }
  }
  if (!elem.classList) {
    elem.className = classStr
  }
}

let removeClass = (elem, className) => {
  elem = selector2dom(elem)
  if (!elem || !className) return
  let classStr = elem.className
  let classnames = (className || '').split(' ')

  for (let i = 0, len = classnames.length; i < len; i++) {
    let classname = classnames[i]
    if (classname) {
      if (elem.classList) {
        elem.classList.remove(classname)
      } else {
        if (hasClass(elem, classname)) {
          classStr = classStr.replace(className, '')
        }
      }
    }
  }
  if (!elem.classList) {
    elem.className = classStr
  }
}

let toggleClass = (elem, className) => {
  if (hasClass(elem, className)) {
    removeClass(elem, className)
  } else {
    addClass(elem, className)
  }
}

let itemClass = (elem, number) => {
  elem = selector2dom(elem)
  if (!elem) return null
  if (elem.classList) {
    return elem.classList.item(number)
  }
  let classnames = (elem.className || '').split(' ')
  if (classnames.length >= number && number >= 0) {
    return  classnames[number]
  }
  return null
}

export {
  hasClass,
  addClass,
  removeClass,
  toggleClass,
  itemClass,
}
