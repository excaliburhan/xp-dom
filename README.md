# xp-dom
A pack to handle dom

## Installation
> npm i xp-dom --save

## Usage
```js
import { on, off } from 'xp-dom'
// var on = require('xp-dom').on

function say() { console.log(1) }
let div = document.querySelector('.box')

on(div, 'click', say)
// on('.box', 'click', say)
off(div, 'click', say)
```

## API

### event

#### on(elem, type, handler)
- attach an event
```js
on('.box', 'click', fn)
```

#### off(elem, type, handler)
- remove an event
```js
on('.box', 'click', fn)
```

#### one(elem, type, hander)
- add an event just once
```js
one('.box', 'click', fn)
```

#### delegate(selector, type, handler, parent)
- delegate an event whenever the dom exsists or not, use event buble, so not all types event are supported.
- selector cant be DOMElemnt.
- parent default is `<body></body>`
```js
delegate('.box2', 'click', fn)
document.querySelector('.box').classList.add('box2') // click box2 will trigger fn
```

#### undelegate(selector, type, handler, parent)
- remove delegate
```js
delegate('.box2', 'click', fn)
undelegate('.box2', 'click', fn)
document.querySelector('.box').classList.add('box2') // click box2 will not trigger fn
```

### element

#### matches(elem, selector)
- returns true if the element would be selected by the specified selector string; otherwise, returns false.
```js
// <div class="box box1"></div>
matches(document.querySelector('.box'), '.box2') // false
```

#### closest(elem, selector)
- returns the closest ancestor of the current element
```js
// <div class="box"><p></p></div>
matches(document.querySelector('p'), '.box') // return the DivElement
```

### classlist

#### hasClass(elem, className)
- returns ture if element has the className. same as classList.contains.
```js
// <div class="box"></div>
hasClass('div', 'box') // true
```

#### addClass(elem, className)
- add className for element. same as classList.add.
```js
// <div class="box"></div>
addClass('div', 'box2') // <div class="box box2"></div>
```

#### removeClass(elem, className)
- remove className for element. same as classList.remove.
```js
// <div class="box"></div>
removeClass('div', 'box') // <div class></div>
```

#### toggleClass(elem, className)
- toggle className for element. same as classList.toggle.
```js
// <div class="box"></div>
toggleClass('div', 'box2') // <div class="box box2"></div>
toggleClass('div', 'box') // <div class></div>
```

#### itemClass(elem, number)
- returns className by index in collection. same as classList.item.
```js
// <div class="box"></div>
itemClass('div', 0) // box
```
