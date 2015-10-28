![type-iterator](type-iterator.png)
---
[![Build Status](https://travis-ci.org/codekirei/type-iterator.svg?branch=master)](https://travis-ci.org/codekirei/type-iterator)
[![Coverage Status](https://coveralls.io/repos/codekirei/type-iterator/badge.svg?branch=master&service=github)](https://coveralls.io/github/codekirei/type-iterator?branch=master)

<b>[About](#about)</b> | 
<b>[Installation](#installation)</b> | 
<b>[Usage](#usage)</b> | 
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

## Usage

## Examples

## Gotchas

## License

[MIT](license)
