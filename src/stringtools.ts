/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-debugger */
/* eslint-disable no-control-regex */

import assert from 'node:assert';

// DevNote: These were all converted from JavaScript to TypeScript based on
// code written previously.

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% String Categorization Functions %%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// These functions are simply used to categorize strings based on types.  These are
// used for the purposes of identifying ana analyzing untrusted/unknown string content
// and providing basic categorization of the content.

/**
 * Check if a value is a string at runtime.
 * @param str
 * @returns
 */
const isString = function (str: any) {
  if (typeof str === 'string') return true;
  return false;
};

/**
 * Checks if a string is an ASCII printable string.
 */
const isAsciiPrintableString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[\x09\x0a\x0d\x20-\x7e]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check for ascii printable alphanumeric symbols only
 */
const isAsciiPrintableSpaceAlphanumericSymbolsString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[\x20-\x7e]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains alphanumeric or underscore
 */
const isAlphaNumericUnderscoreSpaceString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[A-Za-z0-9_ ]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains alphanumeric, underscore, and period only.
 */
const isAlphaNumericUnderscorePeriodString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[A-Za-z0-9_.]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains alphanumeric, underscore, or commas.
 */
const isAlphaNumericUnderscoreSpaceCommaString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[A-Za-z0-9_ ,]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains alphanumeric, underscore, period, or commas.
 */
const isAlphaNumericUnderscoreSpaceCommaPeriodString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[A-Za-z0-9_ ,.]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains alphanumeric or underscore
 */
const isAlphaNumericUnderscoreString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[A-Za-z0-9_]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains alphanumeric, underscore, or dashes
 */
const isAlphaNumericUnderscoreDashString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[A-Za-z0-9_-]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains alphanumeric values
 */
const isAlphaNumericString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[A-Za-z0-9]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains only numeric values
 */
const isNumericString = function (str: string) {
  if (!isString(str)) return false;
  const numeric_check_regexp = new RegExp('^[0-9]+$', 'g');
  if (numeric_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * Check if a string contains alphabet characters only.
 */
const isAlphabetString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[A-Za-z]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * check if a string contains only hexidecimal values
 */
const isHexString = function (str: string) {
  if (!isString(str)) return false;
  const ascii_check_regexp = new RegExp('^[a-f0-9]+$', 'g');
  if (ascii_check_regexp.test(str) === true) return true;

  return false;
};

/**
 * searches a string for disallowed characters
 */
const findDisallowedCharactersInString = function (
  str: string,
  allowed_chars: string[]
) {
  if (!isString(str))
    assert.fail(
      'Invalid string passed to findDisallowedCharactersInString.  This is certainly using this method in error.'
    );
  // check for disallowed chars
  const disallowed_chars = new Map<string, string>();
  for (let idx = 0; idx < str.length; idx++) {
    const char = str[idx];
    if (!disallowed_chars.has(char) && !allowed_chars.includes(char))
      disallowed_chars.set(char, char);
  }

  // return the disallowed charas
  if (disallowed_chars.size > 0) return Array.from(disallowed_chars.values());

  // return null if no disallowed characters were found
  return null;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% String Splitting Utilities %%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

/**
 * This is used for breaking up strings along non-ascii deliniations, and is used
 * mostly for parsing unstructured or unusual text.
 */
const splitOnFirstNonAsciiPrintableChar = function (str: string) {
  // check string
  if (typeof str !== 'string') return null;
  if (str.length <= 0) return null;

  // Define the ASCII printable range: from space (32) to tilde (126)
  const isPrintableAscii = (char: string) =>
    char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126;

  // iterate to string
  for (let i = 0; i < str.length; i++) {
    if (!isPrintableAscii(str[i])) {
      return [str.slice(0, i), str.slice(i)];
    }
  }

  // If no split condition is met, return the original string and an empty string
  return [str, ''];
};

/**
 * simply removes any leading whitespace from a line
 * @param str
 * @returns
 */
const stripLeadingWhitespaceFromString = function (str: string) {
  if (isString(str) !== true) {
    debugger;
    assert.fail(
      'Invalid string passed to stripLeadingWhitespaceFromString.  This is certainly using this method in error.'
    );
  }
  if (str.length <= 0) return str;

  while (true) {
    // always check string length
    if (str.length <= 0) return str;

    // check for whitespace
    switch (str[0]) {
      // remove spaces and tabs
      case ' ':
      case '\t':
        str = str.substring(1);
        break;

      // return the string
      default:
        return str;
    }
  }
};

/**
 * removes the first instance of a string from a string and returns
 * the modified string.  Does not use regular expressions.
 */
const removeFirstInstanceFromString = function (str: string, search: string) {
  if (isString(str) !== true) {
    debugger;
    assert.fail(
      'Invalid string passed to removeFirstInstanceFromString.  This is certainly using this method in error.'
    );
  }

  if (isString(search) !== true) {
    debugger;
    assert.fail(
      'Invalid search string passed to removeFirstInstanceFromString.  This is certainly using this method in error.'
    );
  }

  // if str is shorter than search, we obviously have no matches
  if (str.length <= search.length) return str;

  // gather the index within the string
  const idx = str.indexOf(search);
  if (idx === -1) return str;

  // attempt to modify string
  const mod_str = str.substring(idx + search.length);

  // return the mod_str
  return mod_str;
};

/**
 * This will examine a string and remove any repeating characters.  This is mostly
 * used for analyzing and parsing unstructured text.  Does not use regular expressions.
 * @param val
 * @returns
 */
const removeRepeatingCharactersFromString = function (val: string) {
  if (isString(val) !== true) {
    debugger;
    assert.fail(
      'Invalid string passed to removeRepeatingCharactersFromString.  This is certainly using this method in error.'
    );
  }
  let new_string = '';
  let last_char = null;
  let curr_char = null;
  for (let idx = 0; idx < val.length; idx++) {
    curr_char = val[idx];
    if (last_char === null) new_string += curr_char;
    else {
      if (last_char !== curr_char) new_string += curr_char;
    }
    last_char = val[idx];
  }
  return new_string;
};

/**
 * remove the last character in a string
 */
const rtrim = function (str: string) {
  if (isString(str) !== true) {
    debugger;
    assert.fail(
      'Invalid string passed to chop.  This is certainly using this method in error.'
    );
  }
  return str.slice(0, -1);
};

/**
 * remove the first character in a string
 */
const ltrim = function (str: string) {
  return str.slice(1);
};

/**
 * check if value is a uuid
 */
const isValidUUIDString = function (uuid_val: string) {
  if (!isString(uuid_val)) return false;
  if (uuid_val.length !== 36) return false;

  // check to ensure guid is valid double length guid
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      uuid_val
    ) !== true
  ) {
    return false;
  }
  return true;
};

/**
 * check if value is a double length uuid
 */
const isValidDoubleLengthUUIDString = function (
  double_length_uuid_val: string
) {
  if (!isString(double_length_uuid_val)) return false;
  if (double_length_uuid_val.length !== 72) return false;

  // check to ensure guid is valid double length guid
  if (
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      double_length_uuid_val
    ) !== true
  ) {
    return false;
  }
  return true;
};

/**
 * sort integer string array (parses to in, then sorts by string)
 */
const sortIntegerStringArray = function (int_string_array: string[]) {
  // ensure input is an array
  if (Array.isArray(int_string_array) === false) return null;

  // sorted results
  const numeric_arr: number[] = [];

  // iterate through data and add results
  for (let idx = 0; idx < int_string_array.length; idx++) {
    try {
      numeric_arr.push(parseInt(int_string_array[idx]));
    } catch (err) {}
  }

  // sort the results by integer
  numeric_arr.sort(function (a, b) {
    return a - b;
  });

  // iterate through results
  const sorted_results: string[] = [];
  for (let idx = 0; idx < numeric_arr.length; idx++) {
    sorted_results.push(numeric_arr[idx].toString());
  }

  // return sorted results
  return sorted_results;
};

/*
    // Example usage:
    const inputArray = ["apple!", "Banana", "orange", "apple", "che  rry", "banana", "99dd"];
    custom_utils.sortAndDeduplicateAlphanumericStringArray(inputArray);

    output = ["99dd","apple","banana","cherry","orange"]
*/
/**
 * Take an array of strings, remove any non-alphanumeric characters, sort
 * the strings alphabetically, and remove any duplicates.
 */
const sortAndDeduplicateAlphanumericStringArray = function (
  str_array: string[]
) {
  // ensure we have a string array
  if (Array.isArray(str_array) !== true) return null;
  if (str_array.length <= 0) return null;

  // Step 1: Strip out all non-alphanumeric characters and convert to lowercase
  const cleanedArray = str_array.map(function (str) {
    // strip out disallowed characters and convert to lower case
    return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  });

  // Step 2: Sort the cleaned array alphabetically
  const sortedArray = cleanedArray.sort();

  // Step 3: Remove duplicate entries
  const uniqueArray = sortedArray.filter(
    (value, index, self) => self.indexOf(value) === index
  );

  // return null if there's no entries
  if (uniqueArray.length <= 0) return null;

  // return the unique sorted array
  return uniqueArray;
};

/*

Example: 

tokenizeString
({
    input_string: " hello moo moo COW'`9#@@`",
    options:
    {
        sort        : true,
        deduplicate : true,
        to_lowercase: true
    }
});

output:
["cow9","hello","moo"]

*/
const tokenizeString = function (params: {
  input_string: string;
  options?: {
    sort?: boolean;
    deduplicate?: boolean;
    to_lowercase?: boolean;
  };
}) {
  let input_string = params.input_string;
  const options = params.options;

  // ensure the input string is a string
  if (typeof input_string !== 'string') return null;
  if (input_string.length <= 0) return null;

  // Step 1: Remove non-alphanumeric characters
  input_string = input_string.replace(/[^a-zA-Z0-9\s]/g, ' ');
  if (input_string.length <= 0) return null;

  // ensure the string is not an empty string
  if (isAsciiPrintableString(input_string) !== true) return null;

  // Step 2: Remove duplicate whitespace between words
  input_string = input_string.replace(/\s+/g, ' ');
  if (input_string.length <= 0) return null;

  // Step 3: Split the string into an array using whitespace as delimiter
  let string_array = input_string.split(' ');
  if (string_array.length <= 0) return null;

  // Step 4: Remove whitespace within elements of the array and filter out invalid entries
  string_array = string_array
    .map((str) => str.replace(/\s/g, ''))
    .filter((str) => typeof str === 'string' && str !== '');
  if (string_array.length <= 0) return null;

  // Step 5: Convert all entries to lowercase
  if (options?.to_lowercase === true)
    string_array = string_array.map((str) => str.toLowerCase());
  if (string_array.length <= 0) return null;

  // Step 6: Remove duplicate entries
  if (options?.deduplicate === true)
    string_array = string_array.filter(
      (value, index, self) => self.indexOf(value) === index
    );
  if (string_array.length <= 0) return null;

  // Step 7: Sort the lowercase array alphabetically
  if (options?.sort === true) string_array.sort();

  // return the array
  return string_array;
};

// capitalizes words in a string
const capitalizeWords = function (str: string, separator: string = ' ') {
  if (!isString(str)) {
    assert.fail(
      'Invalid string passed to capitalizeWords.  This is certainly using this method in error.'
    );
  }
  if (str.length <= 0) return null;

  // try to separate string
  const separated_string = str.split(separator);
  if (separated_string.length <= 0) return str.charAt(0).toUpperCase();

  // capitalize first letters
  const capitalized_string = str
    .split(separator)
    .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
    .join(separator);

  // return the capitalized string
  return capitalized_string;
};

// Convert a string to lowercase with underscores
const stringToLowercaseUnderscore = function (str_to_convert: string) {
  if (!isString(str_to_convert)) {
    assert.fail(
      'Invalid string passed to stringToLowercaseUnderscore.  This is certainly using this method in error.'
    );
  }
  if (str_to_convert.length <= 0) return '';

  // convert to lowercase and remove spaces
  str_to_convert = str_to_convert.toLowerCase();
  str_to_convert = str_to_convert.replaceAll(/\s/g, '_');

  // remove all non alphanumeric values
  return str_to_convert.replace(/[^a-z0-9_]+/gi, '');
};

// This will convert a string to lowercase, with no special characters, only single
// spacing.  This is most useful for string comparisons, such as keyword matching
// in strings that containe unusual/unpredictable content.  Error/error-like conditions
// will return null.
const stringToNormalizedLowercaseNoSpecialChars = function (params: {
  input_string: string;
  options?: {
    to_lowercase?: boolean;
    join_str?: string;
  };
}) {
  let input_string = params?.input_string;
  const options = params?.options;

  if (!isString(input_string)) {
    assert.fail(
      'Invalid string passed to stringToNormalizedLowercaseNoSpecialChars.  This is certainly using this method in error.'
    );
  }
  if (input_string.length <= 0) return null;

  // Step 1: Remove non-alphanumeric characters
  input_string = input_string.replace(/[^a-zA-Z0-9\s]/g, ' ');
  if (input_string.length <= 0) return null;

  // ensure the string is not an empty string
  if (isAsciiPrintableString(input_string) !== true) return null;

  // Step 2: Remove duplicate whitespace between words
  input_string = input_string.replace(/\s+/g, ' ');
  if (input_string.length <= 0) return null;

  // Step 3: Split the string into an array using whitespace as delimiter
  let string_array = input_string.split(' ');
  if (string_array.length <= 0) return null;

  // Step 4: Remove whitespace within elements of the array and filter out invalid entries
  string_array = string_array
    .map((str) => str.replace(/\s/g, ''))
    .filter((str) => typeof str === 'string' && str !== '');
  if (string_array.length <= 0) return null;

  // Step 5: Convert all entries to lowercase
  if (options?.to_lowercase === true)
    string_array = string_array.map((str) => str.toLowerCase());
  if (string_array.length <= 0) return null;

  // join using a single space if no string has been provided in options,
  // otherwise, use the provided join string
  let join_str = ' ';
  if (typeof options?.join_str === 'string') join_str = options.join_str;

  // rejoin the string array and return
  const final_string = string_array.join(join_str);

  // return the final string as lowercase
  return final_string.toLowerCase();
};

// convert a string to an array of hex strings (each entry is 0x00-0xff)
const stringToHexArray = function (input_string: string) {
  if (!isString(input_string)) {
    assert.fail(
      'Invalid string passed to stringToHexArray.  This is certainly using this method in error.'
    );
  }
  const hex_array: string[] = [];
  for (let i = 0; i < input_string.length; i++) {
    hex_array.push(input_string.charCodeAt(i).toString(16));
  }
  return hex_array;
};

// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
// %%% String Ends/Starts With %%%%%%%%%%%%%%%%%%%%%%%
// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%

// ends with
const stringEndsWith = function (str: string, ends_with: string) {
  if (!isString(str)) {
    assert.fail(
      'Invalid string passed to stringEndsWith.  This is certainly using this method in error.'
    );
  }
  if (!isString(ends_with)) {
    assert.fail(
      'Invalid ends_with string passed to stringEndsWith.  This is certainly using this method in error.'
    );
  }
  if (str.length < ends_with.length) return false;

  // check string
  if (str.substring(str.length - ends_with.length) == ends_with) return true;

  // if not match, return null
  return false;
};

// check if string ends with item in array
const stringEndsWithItemInArray = function (
  str: string,
  array_of_end_items: string[]
) {
  for (let idx = 0; idx < array_of_end_items.length; idx++) {
    if (stringEndsWith(str, array_of_end_items[idx]) === true) return true;
  }
  return false;
};

// starts with
const stringStartsWith = function (str: string, starts_with: string) {
  // check string
  if (str.indexOf(starts_with) === 0) return true;

  // if not match, return null
  return false;
};

// check if string starts with item in array
const stringStartsWithItemInArray = function (
  str: string,
  array_of_start_items: string[]
) {
  if (!isString(str)) {
    assert.fail(
      'Invalid string passed to stringStartsWithItemInArray.  This is certainly using this method in error.'
    );
  }
  for (let idx = 0; idx < array_of_start_items.length; idx++) {
    if (stringStartsWith(str, array_of_start_items[idx]) === true) return true;
  }
  return false;
};

// remove newlines from string
const stringRemoveNewlines = function (str: string) {
  if (!isString(str)) {
    assert.fail(
      'Invalid string passed to stringRemoveNewlines.  This is certainly using this method in error.'
    );
  }
  str = str.replace(/\r?\n|\r/g, '');
  return str;
};

// remove last line from string
const removeLastLineFromString = function (str: string, char: string = '\n') {
  if (!isString(str)) {
    assert.fail(
      'Invalid string passed to removeLastLineFromString.  This is certainly using this method in error.'
    );
  }
  // run replacement
  try {
    str = str.substring(0, str.lastIndexOf(char));
  } catch (err) {}

  // return the modified string
  return str;
};

/*
This utility is used for removing the "front part" from matching strings.

// strings with common front part of "hello"
let strings = ["hellothere", "hellowhere"];

// run fixups
let modified_strings = custom_utils.removeCommonFrontPartsFromStringArray(strings);

// Output: [ 'there', 'where' ]
*/
const removeCommonFrontPartsFromStringArray = function (strings: string[]) {
  if (strings.length === 0) return [];

  // Find the shortest string in the array
  const shortest_string = strings.reduce((acc, str) => {
    return str.length < acc.length ? str : acc;
  });

  // Loop through the characters of the shortest string
  for (let i = 0; i < shortest_string.length; i++) {
    // gather common prefix
    const common_prefix = shortest_string.slice(0, i + 1);

    // check if common
    const is_common = strings.every((str) => str.startsWith(common_prefix));
    if (!is_common)
      return strings.map((str) => str.slice(common_prefix.length - 1));
  }

  // All strings have the same common prefix
  return strings.map((str) => str.slice(shortest_string.length));
};

// simply returns a joined representation of a string array.
const stringArrayToString = function (
  string_array: string[],
  seperator: string
) {
  if (Array.isArray(string_array) !== true) return null;
  if (string_array.length <= 0) return null;
  if (string_array.length === 1) return string_array[0];

  // simply join all values by astring and return
  return string_array.join(seperator);
};

// split a string by length by inserting a replacement character
const splitStringByLength = function (
  string: string,
  length: number,
  replacement: string = '\n'
) {
  if (Number.isInteger(length) !== true)
    assert.fail('splitStringByLength: Invalid length parameter passed.');
  if (isString(string) !== true)
    assert.fail('splitStringByLength: Invalid string parameter passed.');
  if (isString(replacement) !== true)
    assert.fail('splitStringByLength: Invalid replacement parameter passed.');

  let new_string = '';

  let length_counter = 0;
  for (let idx = 0; idx < string.length; idx++) {
    // append character to string
    new_string += string[idx] + '';

    // break string where necessary
    if (length_counter === length - 1) {
      if (string.length - idx > length) new_string += replacement;
      length_counter = 0;
    } else {
      length_counter++;
    }
  }

  return new_string;
};

export {
  isString,
  isAsciiPrintableString,
  isAsciiPrintableSpaceAlphanumericSymbolsString,
  isAlphaNumericUnderscoreSpaceString,
  isAlphaNumericUnderscorePeriodString,
  isAlphaNumericUnderscoreSpaceCommaString,
  isAlphaNumericUnderscoreSpaceCommaPeriodString,
  isAlphaNumericUnderscoreString,
  isAlphaNumericUnderscoreDashString,
  isAlphaNumericString,
  isNumericString,
  isAlphabetString,
  isHexString,
  findDisallowedCharactersInString,
  splitOnFirstNonAsciiPrintableChar,
  stripLeadingWhitespaceFromString,
  removeFirstInstanceFromString,
  removeRepeatingCharactersFromString,
  rtrim,
  ltrim,
  isValidUUIDString,
  isValidDoubleLengthUUIDString,
  sortIntegerStringArray,
  sortAndDeduplicateAlphanumericStringArray,
  tokenizeString,
  capitalizeWords,
  stringToLowercaseUnderscore,
  stringToNormalizedLowercaseNoSpecialChars,
  stringToHexArray,
  stringEndsWith,
  stringEndsWithItemInArray,
  stringStartsWith,
  stringStartsWithItemInArray,
  stringRemoveNewlines,
  removeLastLineFromString,
  removeCommonFrontPartsFromStringArray,
  stringArrayToString,
  splitStringByLength
};
