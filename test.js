'use strict'

//----------------------------------------------------------
// Modules
//----------------------------------------------------------
// NPM
const assert = require('chai').assert
const sinon = require('sinon')

// Local
const ti = require('./')

//----------------------------------------------------------
// Tests
//----------------------------------------------------------
describe('iterate', () => {
  it('call cb with (val, key) params for each pair in obj', () => {
    const testObj = {'foo': 'bar', 'baz': 'qux'}
    const spy = sinon.spy()
    ti.iterate(testObj, spy)
    assert(spy.calledTwice)
    assert(spy.withArgs('bar', 'foo').calledOnce)
    assert(spy.withArgs('qux', 'baz').calledOnce)
  })
})

describe('allTypes', () => {
  it('if cb, return iterator func')
  it('else return types obj')
})
describe('exclude', () => {
  it('remove all specified types')
  it('if cb, return iterator func')
  it('else return modified types obj')
})
describe('include', () => {
  it('include only specified types')
  it('if cb, return iterator func')
  it('else return modified types obj')
})
