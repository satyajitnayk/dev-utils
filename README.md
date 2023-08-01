# ✨ Awesome Utility Functions ✨

This repository contains a collection of useful utility functions to simplify your day-to-day coding tasks. These
functions are designed to enhance your development workflow and improve code readability. Feel free to explore and
integrate them into your projects! 🚀

## 📦 Installation

To use these utility functions in your project, simply install the package from npm:

```bash
npm install dev-utils-ts
```

## 💡 Usage

### `withTempDirs`

This function creates temporary directories, executes the provided callback function, and then cleans up all directories
thereafter.

```typescript
import {withTempDirs} from 'dev-utils-ts';

async function myFunction() {
  try {
    const result = await withTempDirs(['/tmp/dir1', '/tmp/dir2'], async () => {
      // Your code that requires temporary directories goes here...
      return 'Result of your awesome function';
    });
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
}
```

### `replaceMultiple`

This function replaces all occurrences of match strings with corresponding replacement strings in a given string.

```typescript
import {replaceMultiple} from 'dev-utils-ts';

const originalString = 'Hello world! This is a beautiful day.';
const matchStrings = ['world', 'beautiful', 'day'];
const replacementStrings = ['universe', 'wonderful', 'morning'];

const modifiedString = replaceMultiple(originalString, matchStrings, replacementStrings);
console.log(modifiedString);
// Output: 'Hello universe! This is a wonderful morning.'
```

## 🚀 Contributing

Contributions to this repository are welcome! Feel free to open an issue or submit a pull request with your improvement
ideas. 💪
