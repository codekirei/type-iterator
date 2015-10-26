'use strict'

//----------------------------------------------------------
// Types
//----------------------------------------------------------
const types = {
  'undefined': undefined,
  'null': null,
  'string': 'abc',
  'boolean': true,
  'number': 1,
  'function': () => {},
  'array': [],
  'object': {}
}

//----------------------------------------------------------
// Logic
//----------------------------------------------------------
/**
 *
 * @param {}
 */
function iterate(obj, cb) {
  return Object.keys(obj).map(key => {
    return cb(obj[key], key)
  })
}

/**
 *
 * @param {}
 */
function allTypes(cb) {
  return cb
    ? iterate(types, cb)
    : types
}

/**
 * @function exclude
 * @param {*} exceptions - types or type to exclude
 * @returns {Object} - types with exceptions excluded
 */
function exclude(exceptions, cb) {
  let clone = {}
  iterate(types, (val, key) => clone[key] = val)

  exceptions instanceof Array
    ? exceptions.map(type => delete clone[type])
    : delete clone[exceptions]

  return cb
    ? iterate(clone, cb)
    : clone
}

/**
 * @function include
 * @param {*} specified - types or type to include
 * @returns {Object} - types or type included
 */
function include(specified, cb) {
  let clone = {}

  specified instanceof Array
    ? specified.map(type => clone[type] = types[type])
    : clone[specified] = types[specified]

  return cb
    ? iterate(clone, cb)
    : clone
}

//----------------------------------------------------------
// Exports
//----------------------------------------------------------
module.exports = allTypes
module.exports.exclude = exclude
module.exports.include = include
