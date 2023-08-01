import {replaceMultiple, withTempDirs} from '../src'

describe('util functions', () => {
  // TODO: Add testcases
  it('withTempDirs', () => {
    expect(1).toBe(1)
  })

  describe('replaceMultiple', function () {
    it('equal lengths of matchStrings and replacementStrings', () => {
      expect(replaceMultiple(
        'Hello, this is a test. Test me!',
        ['Hello', 'test'],
        ['Hi', 'check'])
      ).toBe('Hi, this is a check. Test me!')
    })
    it('unequal lengths of matchStrings and replacementStrings', () => {
      expect(replaceMultiple(
        'Hello, this is a test. Test me!',
        ['Hello', 'test'],
        ['Hi'])
      ).toBe('Hello, this is a test. Test me!')
    })
    it('multiple occurrences of matchStrings in str', () => {
      expect(replaceMultiple(
        'aaaaa bbbb aaaaa bbbb',
        ['aaaaa', 'bbbb'],
        ['1111', '2222'])
      ).toBe('1111 2222 1111 2222')
    })
    it('no occurrences of matchStrings in str', () => {
      expect(replaceMultiple(
        'This is a test. Test me!',
        ["abc", "xyz"],
        ["123", "456"])
      ).toBe('This is a test. Test me!')
    })
    it('empty string and arrays', () => {
      expect(replaceMultiple(
        '',
        [],
        [])
      ).toBe('')
    })
  });
})
