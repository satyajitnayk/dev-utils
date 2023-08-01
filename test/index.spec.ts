import {replaceMultiple, withTempDirs} from '../src/index'
import * as fs from 'fs';


describe('util functions', () => {
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
  describe('withTempDirs', () => {
    it('should return the result of the callback function', async () => {
      const result = await withTempDirs(['/tmp/dir1'], async () => {
        return 42;
      });
      expect(result).toBe(42);
    });
    it('should handle asynchronous operations in the callback', async () => {
      const result = await withTempDirs(['/tmp/dir1'], async () => {
        await new Promise(resolve => setTimeout(resolve, 100)); // Simulate an async operation
        return 'done';
      });
      expect(result).toBe('done');
    });
    it('should throw an error if the callback throws an error', async () => {
      await expect(
        withTempDirs(['/tmp/dir1'], async () => {
          throw new Error('Something went wrong!');
        })
      ).rejects.toThrow('Something went wrong!');
    });
    it('should create the temporary directories before executing the callback', async () => {
      const dirs = ['/tmp/dir1'];
      await withTempDirs(dirs, async () => {
        expect(await fs.promises.readdir(dirs[0])).toEqual([]); // Check if directory is empty
      });
    });
    it('should delete the temporary directories after executing the callback', async () => {
      const dirs = ['/tmp/dir1'];
      await withTempDirs(dirs, async () => {
        // Do nothing in the callback
      });
      await expect(async () => await fs.promises.access(dirs[0]))
        .rejects.toThrow("ENOENT: no such file or directory, access '/tmp/dir1'") // Check if directory exists
    });
    it('should work with multiple temporary directories', async () => {
      const dirs = ['/tmp/dir1', '/tmp/dir2'];
      const result = await withTempDirs(dirs, async () => {
        return dirs.join(', ');
      });
      expect(result).toBe('/tmp/dir1, /tmp/dir2');
    });
    it('should handle nested temporary directories', async () => {
      const dirs = ['/tmp/dir1/subdir'];
      const result = await withTempDirs(dirs, async () => {
        return 'nested';
      });
      expect(result).toBe('nested');
    });
    it('should work with an empty array of temporary directories', async () => {
      const result = await withTempDirs([], async () => {
        return 'empty';
      });

      expect(result).toBe('empty');
    });
  });
})
