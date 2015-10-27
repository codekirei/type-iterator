'use strict'

//----------------------------------------------------------
// Modules
//----------------------------------------------------------
// NPM
const assert = require('chai').assert
const sinon = require('sinon')
const clone = require('lodash.clonedeep')

// Local
const ti = require('../')
const types = ti.types

//----------------------------------------------------------
// Tests
//----------------------------------------------------------
describe('types', () => {
  it('type values are what they claim to be', () => {
    assert.isUndefined(types.undefined)
    assert.isNull(types.null)
    assert.isString(types.string)
    assert.isBoolean(types.boolean)
    assert.isNumber(types.number)
    assert.isFunction(types.function)
    assert.isArray(types.array)
    assert.isObject(types.object)
  })
})

describe('iterate', () => {
  it('call cb with (val, key) params for each pair in obj', () => {
    const testObj = {'foo': 'bar', 'baz': 'qux'}
    const spy = sinon.spy()
    ti.iterate(testObj, spy)
    assert(spy.calledTwice, 'call cb twice')
    assert(spy.withArgs('bar', 'foo').calledOnce, 'call cb with (bar, foo)')
    assert(spy.withArgs('qux', 'baz').calledOnce, 'call cb with (qux, baz)')
  })
})

describe('allTypes', () => {
  it('if cb, iterate', () => {
    const spy = sinon.spy()
    const callCount = Object.keys(types).length
    ti(spy)
    assert(spy.called, 'call cb')
    assert.equal(callCount, spy.callCount, 'call cb for each type')
  })

  it('else return types obj', () => {
    const testObj = ti()
    assert.deepEqual(Object.keys(types), Object.keys(testObj))
    Object.keys(testObj).map(key => {
      key === 'function'
        ? assert.equal(types.function.toString(), testObj.function.toString())
        : assert.deepEqual(types[key], testObj[key])
    })
  })
})

describe('exclude', () => {
  const exclusions = ['function', 'null']

  it('if cb, return iterator func', () => {
    const spy = sinon.spy()
    const callCount = Object.keys(types).length - exclusions.length
    ti.exclude(exclusions, spy)
    assert(spy.called, 'call cb')
    assert.equal(callCount, spy.callCount, 'call cb for each type')
  })

  it('else return modified types obj', () => {
    const typesClone = clone(types)
    exclusions.map(type => delete typesClone[type])
    assert.deepEqual(typesClone, ti.exclude(exclusions))
  })

  it('handle single string param', () => {
    const typesClone = clone(types)
    const testType = 'function'
    delete typesClone[testType]
    assert.deepEqual(typesClone, ti.exclude(testType))
  })
})

describe('include', () => {
  const inclusions = ['array', 'object']

  it('if cb, return iterator func', () => {
    const spy = sinon.spy()
    const callCount = inclusions.length
    ti.include(inclusions, spy)
    assert(spy.called, 'call cb')
    assert.equal(callCount, spy.callCount, 'call cb for each type')
  })

  it('else return modified types obj', () => {
    const expected = {'array': [], 'object': {}}
    assert.deepEqual(expected, ti.include(inclusions))
  })

  it('handle single string param', () => {
    const expected = {'array': []}
    assert.deepEqual(expected, ti.include('array'))
  })
})
