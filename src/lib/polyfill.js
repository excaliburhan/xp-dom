/**
 * @author xiaoping
 * @email edwardhjp@gmail.com
 * @create date 2017-03-21 07:36:49
 * @modify date 2017-03-21 07:36:49
 * @desc [polyfill for es5 methods]
*/

let stringProto = String.prototype
let arrayProto = Array.prototype

let trim = (str) => {
  function _trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '')
  }
  if (stringProto.trim) {
    return str.trim()
  }
  return _trim(str)
}

// Production steps of ECMA-262, Edition 5, 15.4.4.14
// Reference: http://es5.github.io/#x15.4.4.14
let indexOf = (originElem, searchElem, fromIndex) => {
  if (arrayProto.indexOf) {
    return originElem.indexOf(searchElem, fromIndex)
  }
  let k
  // 1. Let o be the result of calling ToObject passing the this value as the argument.
  if (originElem === null) {
    throw new TypeError('"originElememt" is null or not defined')
  }

  let o = Object(this)
  // 2. Let lenValue be the result of calling the Get internal method of o with the argument "length".
  // 3. Let len be ToUint32(lenValue).
  let len = o.length >>> 0

  // 4. If len is 0, return -1.
  if (len === 0) return -1

  // 5. If argument fromIndex was passed let n be ToInteger(fromIndex); else let n be 0.
  let n = fromIndex | 0
  // 6. If n >= len, return -1.
  if (n >= len) {
    return -1
  }

  // 7. If n >= 0, then Let k be n.
  // 8. Else, n<0, Let k be len - abs(n). If k is less than 0, then let k be 0.
  k = Math.max(n >= 0 ? n : len - Math.abs(n), 0)

  // 9. Repeat, while k < len
  while (k < len) {
    // a. Let Pk be ToString(k). This is implicit for LHS operands of the in operator
    // b. Let kPresent be the result of calling the HasProperty internal method of o with argument Pk. This step can be combined with c
    // c. If kPresent is true, then
    //   i.  Let elementK be the result of calling the Get internal method of o with the argument ToString(k).
    //   ii.  Let same be the result of applying the Strict Equality Comparison Algorithm to searchElement and elementK.
    //   iii.  If same is true, return k.
    if (k in o && o[k] === searchElem) {
      return k
    }
    k++
  }
  return -1
}

export {
  trim,
  indexOf,
}
