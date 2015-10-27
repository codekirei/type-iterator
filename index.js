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
  'function': new Function(),
  'array': [],
  'object': {}
}

//----------------------------------------------------------
// Logic
//----------------------------------------------------------
/**
 * @function iterate
 * @param {object} obj - object to iterate over
 * @param {function} cb - function to call on each K:V pair in object
 * @returns {array} - array of callback results
 */
function iterate(obj, cb) {
  return Object.keys(obj).map(key => {
    return cb(obj[key], key)
  })
}

/**
 * @function allTypes
 * @param {function} [cb] - function to call on each K:V pair in object
 * @returns {array|object} - array of cb results or types object
 */
function allTypes(cb) {
  return cb
    ? iterate(types, cb)
    : types
}

/**
 * @function exclude
 * @param {string|strings[]} exceptions - types or type to exclude
 * @param {function} [cb] - function to call on each K:V pair in object
 * @returns {array|object} - array of cb results or modified types object
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
 * @param {string|strings[]} specified - types or type to include
 * @param {function} [cb] - function to call on each K:V pair in object
 * @returns {array|object} - array of cb results or modified types object
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
module.exports.iterate = iterate
module.exports.types = types
