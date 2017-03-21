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


