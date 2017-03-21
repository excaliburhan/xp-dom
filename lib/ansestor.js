"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});


var elementProto = window.Element.prototype;

var matches = function matches(elem, selector) {
  function _matches(elem, selector) {
    var elems = (elem.document || elem.ownerDocument).querySelectorAll(selector);
    var index = 0;
    while (elems[index] && elems[index] !== elem) {
      ++index;
    }
    return Boolean(elems[index]);
  }
  if (elementProto.msMatchesSelector || elementProto.mozMatchesSelector || elementProto.webkitMatchesSelector) {
    return elem.msMatchesSelector(selector) || elem.mozMatchesSelector(selector) || elem.webkitMatchesSelector(selector);
  }
  return _matches(elem, selector);
};

var closest = function closest(elem, selector) {
  function _closest(selector) {
    while (elem && elem.nodeType === 1) {
      if (elem.matches(selector)) {
        return elem;
      }
      elem = elem.parentNode;
    }
    return null;
  }
  if (elementProto.closest) {
    return elem.closest(selector);
  }
  return _closest(elem, selector);
};

exports.matches = matches;
exports.closest = closest;