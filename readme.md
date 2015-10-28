<div id="custom-style" style="background: red; color: white;">
![type-iterator](type-iterator.png)
---
[![Build Status](https://travis-ci.org/codekirei/type-iterator.svg?branch=master)](https://travis-ci.org/codekirei/type-iterator)
[![Coverage Status](https://coveralls.io/repos/codekirei/type-iterator/badge.svg?branch=master&service=github)](https://coveralls.io/github/codekirei/type-iterator?branch=master)

<b>[About](#about)</b> | 
<b>[Installation](#installation)</b> | 
<b>[API](#api)</b> | 
<b>[Examples](#examples)</b> | 
<b>[Gotchas](#gotchas)</b> | 
<b>[License](#license)</b>

## About

A Node.js module that runs a callback function against multiple basic JS types.
Envisioned as a testing utility to ensure that functions and methods respond appropriately to specific types.
Requires Node.js `4.0` or newer.

Supports the following types/entities:

* `undefined`
* `null`
* `String`
* `Boolean`
* `Number`
* `Function`
* `Array`
* `Object`

Note that the new ES6 types are not included (Symbol, Map, Set, WeakMap, WeakSet...).
I'm not opposed to adding them; I just didn't need them for my intended use of this module (yet).

## Installation

Install and `require` in typical Node.js fashion.

**Using in module:** `$ npm install --save type-iterator`

**Using in tests:** `$ npm install --save-dev type-iterator`

## API

The following object is the heart of this module:

```js
const types = {
  'undefined': undefined,
  'null': null,
  'string': 'abc',
  'boolean': true,
  'number': 1,
  'function': new Function(),
  'array': [],
  'object': {}
}
```

Each value is a type literal for the type named in its key.
`type-iterator` provides three ways to iterate over these types.

### typeIterator(cb)

Iterates over all types.
If cb is provided, iterate and return array of cb results.
Else return unmodified types object.

### typeIterator.exclude(types, cb)

Iterates over all types except specified exclusion(s).
`types` can be a string or array of strings.
If cb is provided, iterate over types except exclusions and return results.
Else return modified types object.

### typeIterator.include(types, cb)

Iterates over only specified type(s).
`types` can be a string or array of strings.
If cb is provided, iterate over specified types and return results.
Else return modified types object.

## Examples

**Contrived**

```js
//----------------------------------------------------------
// setup
//----------------------------------------------------------
const typeIterator = require('type-iterator')

function exampleCb(val, key) {
  console.log(key, ':', val)
}

//----------------------------------------------------------
// allTypes
//----------------------------------------------------------
typeIterator() // returns types object with all types

typeIterator(exampleCb) // console logs each key: val pair

//----------------------------------------------------------
// exclude
//----------------------------------------------------------
// get types object sans 'undefined' type
// note: could also use an array of strings as param (for multiple types)
typeIterator.exclude('undefined')

// log all key: val type pairs except undefined
typeIterator.exclude('undefined', exampleCb)

//----------------------------------------------------------
// include
//----------------------------------------------------------
const typesToInclude = ['object', 'array']

// get types object with only object and array key: val pairs
// note: could also use a single string as param (for 1 type)
typeIterator.include(typesToInclude)

// log object and array key: val pairs
typeIterator.include(typesToInclude, exampleCb)

```

**Realistic**

```js
```

## Gotchas

Keep in mind that the `undefined` and `null` type literals evaluate to false in simple conditional expressions.
Consider the following contrived example with an optional parameter and a type restriction using [kind-of](https://github.com/jonschlinkert/kind-of):

```js
function awesomeFunc(opt) {
  if (opt && kindOf(opt) === 'array' || kindOf(opt) === 'object') {
    console.log('hooray! opt provided')
  } else if (opt) {
    throw new Error('you dun goofed! wrong opt type')
  }
}
```

So, we can use `type-iterator` to write a quick test that makes sure `awesomeFunc` throws for all types other than array and object.

```js
// WRONG DON'T DO THIS
// mocha-style test
describe('awesomeFunc', () => {
  it('throws for all types other than object and array', () => {
    typeIterator.exclude(['object', 'array'], (val) => {
      assert.throws(() => awesomeFunc(val))
    })
  })
})
```

This test fails.
Why?
Because `awesomeFunc` checks for the optional param with `if (opt)`.
`if(null)` and and `if(undefined)` are both false, so the `throw` never gets called for those values.
The fix is either to make `awesomeFunc`'s optional param checking more robust or also exclude `'null'` and `'undefined'` in the test case.

## License

[MIT](license)
</div>
