/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import test from 'node:test';
import assert from 'node:assert';

import {
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
  chop,
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
} from '@src/stringtools';

(async function () {
  test('isString tests.', async function () {
    assert.strictEqual(isString(''), true);
    assert.strictEqual(isString('a'), true);
    assert.strictEqual(isString('abc'), true);
    assert.strictEqual(isString('abc123'), true);
  });

  test('isAsciiPrintableString tests.', async function () {});

  test('isAsciiPrintableSpaceAlphanumericSymbolsString tests.', async function () {});

  test('isAlphaNumericUnderscoreSpaceString tests.', async function () {});

  test('isAlphaNumericUnderscorePeriodString tests.', async function () {});

  test('isAlphaNumericUnderscoreSpaceCommaString tests.', async function () {});

  test('isAlphaNumericUnderscoreSpaceCommaPeriodString tests.', async function () {});

  test('isAlphaNumericUnderscoreString tests.', async function () {});

  test('isAlphaNumericUnderscoreDashString tests.', async function () {});

  test('isAlphaNumericString tests.', async function () {});

  test('isNumericString tests.', async function () {});

  test('isAlphabetString tests.', async function () {});

  test('isHexString tests.', async function () {});

  test('findDisallowedCharactersInString tests.', async function () {});

  test('splitOnFirstNonAsciiPrintableChar tests.', async function () {});

  test('stripLeadingWhitespaceFromString tests.', async function () {});

  test('removeFirstInstanceFromString tests.', async function () {});

  test('removeRepeatingCharactersFromString tests.', async function () {});

  test('chop/lchop/rtrim/ltrim tests.', async function () {});

  test('isValidUUIDString/isValidDoubleLengthUUIDString tests.', async function () {});

  test('sortIntegerStringArray tests.', async function () {});

  test('sortAndDeduplicateAlphanumericStringArray tests.', async function () {});

  test('tokenizeString tests.', async function () {});

  test('capitalizeWords tests.', async function () {});

  test('stringToLowercaseUnderscore tests.', async function () {});

  test('stringToNormalizedLowercaseNoSpecialChars tests.', async function () {});

  test('stringToHexArray tests.', async function () {});

  test('stringEndsWith/stringEndsWithItemInArray tests.', async function () {});

  test('stringStartsWith/stringStartsWithItemInArray tests.', async function () {});

  test('stringRemoveNewlines tests.', async function () {});

  test('removeLastLineFromString tests.', async function () {});

  test('removeCommonFrontPartsFromStringArray tests.', async function () {});

  test('stringArrayToString tests.', async function () {});

  test('splitStringByLength tests.', async function () {});
})();
