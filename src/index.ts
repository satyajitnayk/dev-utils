import fs from 'fs';

/**
 * creates temporary directories, execute provides function
 * & clean all directories thereafter
 * @param dirs
 * @param callback
 */
export async function withTempDirs<T>(
  dirs: string[],
  callback: () => Promise<T>
): Promise<T> {
  try {
    // create temporary directories
    await Promise.all(
      dirs.map(dir => fs.promises.mkdir(dir, {recursive: true}))
    )
    // execute the callback function
    return await callback();
  } catch (e) {
    throw e;
  } finally {
    // clean all the temporary directories
    await Promise.all(
      dirs.map(dir => fs.promises.rmdir(dir, {recursive: true}))
    )
  }
}

/**
 * replace all match strings with replacement strings in str
 * @param str
 * @param matchStrings
 * @param replacementStrings
 */
export function replaceMultiple(
  str: string,
  matchStrings: string[],
  replacementStrings: string[]
): string {
  if (matchStrings.length !== replacementStrings.length) {
    return str;
  }
  matchStrings.forEach((matchStr: string, index: number) => {
    const regex = new RegExp(matchStr, 'g');
    str = str.replace(regex, replacementStrings[index]);
  })
  return str;
}
