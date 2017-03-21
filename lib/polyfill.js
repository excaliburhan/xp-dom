'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var stringProto = String.prototype;
var arrayProto = Array.prototype;

var trim = function trim(str) {
  function _trim(str) {
    return str.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, '');
  }
  if (stringProto.trim) {
    return str.trim();
  }
  return _trim(str);
};

var indexOf = function indexOf(originElem, searchElem, fromIndex) {
  if (arrayProto.indexOf) {
    return originElem.indexOf(searchElem, fromIndex);
  }
  var k = void 0;

  if (originElem === null) {
    throw new TypeError('"originElememt" is null or not defined');
  }

  var o = Object(undefined);

  var len = o.length >>> 0;

  if (len === 0) return -1;

  var n = fromIndex | 0;

  if (n >= len) {
    return -1;
  }

  k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

  while (k < len) {
    if (k in o && o[k] === searchElem) {
      return k;
    }
    k++;
  }
  return -1;
};

exports.trim = trim;
exports.indexOf = indexOf;