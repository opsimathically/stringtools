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
} from '@src/stringtools';

(async function () {
  test('isString tests.', async function () {
    assert.strictEqual(isString(''), true);
    assert.strictEqual(isString('a'), true);
    assert.strictEqual(isString('abc'), true);
    assert.strictEqual(isString('abc123'), true);
    assert.strictEqual(isString(1234), false);
  });

  test('isAsciiPrintableString tests.', async function () {
    assert.strictEqual(isAsciiPrintableString('abcd1234'), true);
    assert.strictEqual(isAsciiPrintableString('abcd1\xf4\xe7234'), false);
  });

  test('isAsciiPrintableSpaceAlphanumericSymbolsString tests.', async function () {
    assert.strictEqual(
      isAsciiPrintableSpaceAlphanumericSymbolsString('abcd1234 #abcd-'),
      true
    );
    assert.strictEqual(
      isAsciiPrintableSpaceAlphanumericSymbolsString('abcd1\xf4\xe7234'),
      false
    );
  });

  test('isAlphaNumericUnderscoreSpaceString tests.', async function () {
    assert.strictEqual(isAlphaNumericUnderscoreSpaceString('abc_123'), true);
    assert.strictEqual(isAlphaNumericUnderscoreSpaceString('abc#123'), false);
  });

  test('isAlphaNumericUnderscorePeriodString tests.', async function () {
    assert.strictEqual(isAlphaNumericUnderscorePeriodString('abc.123_'), true);
    assert.strictEqual(isAlphaNumericUnderscorePeriodString('abc#123!'), false);
  });

  test('isAlphaNumericUnderscoreSpaceCommaString tests.', async function () {
    assert.strictEqual(
      isAlphaNumericUnderscoreSpaceCommaString('abc,123_ '),
      true
    );
    assert.strictEqual(
      isAlphaNumericUnderscoreSpaceCommaString('abc#123'),
      false
    );
  });

  test('isAlphaNumericUnderscoreSpaceCommaPeriodString tests.', async function () {
    assert.strictEqual(
      isAlphaNumericUnderscoreSpaceCommaPeriodString('abc,123_ .'),
      true
    );
    assert.strictEqual(
      isAlphaNumericUnderscoreSpaceCommaPeriodString('abc#123'),
      false
    );
  });

  test('isAlphaNumericUnderscoreString tests.', async function () {
    assert.strictEqual(isAlphaNumericUnderscoreString('abc_123'), true);
    assert.strictEqual(isAlphaNumericUnderscoreString('abc#123'), false);
  });

  test('isAlphaNumericUnderscoreDashString tests.', async function () {
    assert.strictEqual(isAlphaNumericUnderscoreDashString('abc-123_'), true);
    assert.strictEqual(isAlphaNumericUnderscoreDashString('abc#123'), false);
  });

  test('isAlphaNumericString tests.', async function () {
    assert.strictEqual(isAlphaNumericString('abc123'), true);
    assert.strictEqual(isAlphaNumericString('abc#123'), false);
  });

  test('isNumericString tests.', async function () {
    assert.strictEqual(isNumericString('123'), true);
    assert.strictEqual(isNumericString('abc123'), false);
  });

  test('isAlphabetString tests.', async function () {
    assert.strictEqual(isAlphabetString('abc'), true);
    assert.strictEqual(isAlphabetString('abc123'), false);
  });

  test('isHexString tests.', async function () {
    assert.strictEqual(isHexString('beef'), true);
    assert.strictEqual(isHexString('Hi there!'), false);
  });

  test('findDisallowedCharactersInString tests.', async function () {
    const disallowed_chars = findDisallowedCharactersInString('abc123', [
      'a',
      '1'
    ]);

    if (!disallowed_chars)
      assert.fail('findDisallowedCharactersInString failed.');

    if (
      disallowed_chars[0] !== 'b' ||
      disallowed_chars[1] !== 'c' ||
      disallowed_chars[2] !== '2' ||
      disallowed_chars[3] !== '3'
    ) {
      assert.fail('findDisallowedCharactersInString failed.');
    }
  });

  test('splitOnFirstNonAsciiPrintableChar tests.', async function () {
    const split_val = splitOnFirstNonAsciiPrintableChar('abc\xf4 123');
    if (Array.isArray(split_val) !== true)
      assert.fail('splitOnFirstNonAsciiPrintableChar failed.');
    if (split_val.length !== 2)
      assert.fail('splitOnFirstNonAsciiPrintableChar failed.');
    if (split_val[0] !== 'abc')
      assert.fail('splitOnFirstNonAsciiPrintableChar failed.');
    if (split_val[1] !== '\xf4 123')
      assert.fail('splitOnFirstNonAsciiPrintableChar failed.');
  });

  test('stripLeadingWhitespaceFromString tests.', async function () {
    if (stripLeadingWhitespaceFromString('  \t  abc') !== 'abc')
      assert.fail('stripLeadingWhitespaceFromString failed.');
  });

  test('removeFirstInstanceFromString tests.', async function () {
    if (removeFirstInstanceFromString('abc123abc', 'abc') !== '123abc')
      assert.fail('removeFirstInstanceFromString failed.');
  });

  test('removeRepeatingCharactersFromString tests.', async function () {
    if (removeRepeatingCharactersFromString('aabbcc') !== 'abc')
      assert.fail('removeRepeatingCharactersFromString failed.');
  });

  test('chop/ltrim tests.', async function () {
    if (rtrim('abc') !== 'ab') assert.fail('rtrim failed.');
    if (ltrim(' abc') !== 'abc') assert.fail('ltrim failed.');
  });

  test('isValidUUIDString/isValidDoubleLengthUUIDString tests.', async function () {
    if (isValidUUIDString('123e4567-e89b-12d3-a456-426614174000') !== true)
      assert.fail('isValidUUIDString failed.');
    if (
      isValidDoubleLengthUUIDString(
        '123e4567-e89b-12d3-a456-426614174000123e4567-e89b-12d3-a456-426614174000'
      ) !== true
    )
      assert.fail('isValidDoubleLengthUUIDString failed.');
  });

  test('sortIntegerStringArray tests.', async function () {
    assert.deepStrictEqual(sortIntegerStringArray(['3', '1', '2']), [
      '1',
      '2',
      '3'
    ]);
  });

  test('sortAndDeduplicateAlphanumericStringArray tests.', async function () {
    assert.deepStrictEqual(
      sortAndDeduplicateAlphanumericStringArray(['3', '1', '2', '1', '2']),
      ['1', '2', '3']
    );
  });

  test('tokenizeString tests.', async function () {
    const tokenized_lorem_ipsum = tokenizeString({
      input_string:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      options: {
        sort: true,
        deduplicate: true,
        to_lowercase: true
      }
    });

    assert.deepStrictEqual(tokenized_lorem_ipsum, [
      'ad',
      'adipiscing',
      'aliqua',
      'aliquip',
      'amet',
      'anim',
      'aute',
      'cillum',
      'commodo',
      'consectetur',
      'consequat',
      'culpa',
      'cupidatat',
      'deserunt',
      'do',
      'dolor',
      'dolore',
      'duis',
      'ea',
      'eiusmod',
      'elit',
      'enim',
      'esse',
      'est',
      'et',
      'eu',
      'ex',
      'excepteur',
      'exercitation',
      'fugiat',
      'id',
      'in',
      'incididunt',
      'ipsum',
      'irure',
      'labore',
      'laboris',
      'laborum',
      'lorem',
      'magna',
      'minim',
      'mollit',
      'nisi',
      'non',
      'nostrud',
      'nulla',
      'occaecat',
      'officia',
      'pariatur',
      'proident',
      'qui',
      'quis',
      'reprehenderit',
      'sed',
      'sint',
      'sit',
      'sunt',
      'tempor',
      'ullamco',
      'ut',
      'velit',
      'veniam',
      'voluptate'
    ]);
  });

  test('capitalizeWords tests.', async function () {
    assert.strictEqual(
      capitalizeWords('lorem ipsum dolor'),
      'Lorem Ipsum Dolor'
    );
  });

  test('stringToLowercaseUnderscore tests.', async function () {
    assert.strictEqual(
      stringToLowercaseUnderscore('Lorem Ipsum Dolor'),
      'lorem_ipsum_dolor'
    );
  });

  test('stringToNormalizedLowercaseNoSpecialChars tests.', async function () {
    assert.strictEqual(
      stringToNormalizedLowercaseNoSpecialChars({
        input_string: 'Lorem Ipsum Dolor',
        options: {
          to_lowercase: true
        }
      }),
      'lorem ipsum dolor'
    );
  });

  test('stringToHexArray tests.', async function () {
    assert.deepStrictEqual(stringToHexArray('abc'), ['61', '62', '63']);
  });

  test('stringEndsWith/stringEndsWithItemInArray tests.', async function () {
    assert.strictEqual(stringEndsWith('abc', 'c'), true);
    assert.strictEqual(stringEndsWith('abc', 'b'), false);
    assert.strictEqual(stringEndsWithItemInArray('abc', ['c']), true);
    assert.strictEqual(stringEndsWithItemInArray('abc', ['b']), false);
  });

  test('stringStartsWith/stringStartsWithItemInArray tests.', async function () {
    assert.strictEqual(stringStartsWith('abc', 'a'), true);
    assert.strictEqual(stringStartsWith('abc', 'b'), false);
    assert.strictEqual(stringStartsWithItemInArray('abc', ['a']), true);
    assert.strictEqual(stringStartsWithItemInArray('abc', ['b']), false);
  });

  test('stringRemoveNewlines tests.', async function () {
    assert.strictEqual(stringRemoveNewlines('abc\n123\n'), 'abc123');
  });

  test('removeLastLineFromString tests.', async function () {
    assert.strictEqual(removeLastLineFromString('abc\n123'), 'abc');
  });

  test('removeCommonFrontPartsFromStringArray tests.', async function () {
    assert.deepStrictEqual(
      removeCommonFrontPartsFromStringArray(['abc123', 'abc456']),
      ['123', '456']
    );
  });

  test('stringArrayToString tests.', async function () {
    assert.strictEqual(stringArrayToString(['abc', '123'], ' '), 'abc 123');
  });

  test('splitStringByLength tests.', async function () {
    assert.deepStrictEqual(
      splitStringByLength('abc123def456', 3),
      'abc\n123\ndef\n456'
    );
  });
})();
