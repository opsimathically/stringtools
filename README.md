# stringtools

These tools have been cannibalized from a number of my internal projects and have been consolidated
here. All functions exported work directly with strings, and are designed to provide some
arbitrary string behavior.

## Install

```bash
npm install @opsimathically/stringtools
```

## Building from source

This package is intended to be run via npm, but if you'd like to build from source,
clone this repo, enter directory, and run `npm install` for dev dependencies, then run
`npm run build`.

## Usage

[See API Reference for documentation](https://github.com/opsimathically/stringtools/blob/main/docs/)

[See unit tests for usage examples](https://github.com/opsimathically/stringtools/blob/main/test/stringtools.test.ts)

### APIs

- isString
- isAsciiPrintableString
- isAsciiPrintableSpaceAlphanumericSymbolsString
- isAlphaNumericUnderscoreSpaceString
- isAlphaNumericUnderscorePeriodString
- isAlphaNumericUnderscoreSpaceCommaString
- isAlphaNumericUnderscoreSpaceCommaPeriodString
- isAlphaNumericUnderscoreString
- isAlphaNumericUnderscoreDashString
- isAlphaNumericString
- isNumericString
- isAlphabetString
- isHexString
- findDisallowedCharactersInString
- splitOnFirstNonAsciiPrintableChar
- stripLeadingWhitespaceFromString
- removeFirstInstanceFromString
- removeRepeatingCharactersFromString
- rtrim
- ltrim
- isValidUUIDString
- isValidDoubleLengthUUIDString
- sortIntegerStringArray
- sortAndDeduplicateAlphanumericStringArray
- tokenizeString
- capitalizeWords
- stringToLowercaseUnderscore
- stringToNormalizedLowercaseNoSpecialChars
- stringToHexArray
- stringEndsWith
- stringEndsWithItemInArray
- stringStartsWith
- stringStartsWithItemInArray
- stringRemoveNewlines
- removeLastLineFromString
- removeCommonFrontPartsFromStringArray
- stringArrayToString
- splitStringByLength
