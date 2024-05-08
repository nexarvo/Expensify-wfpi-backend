module.exports = {
    tabWidth: 4,
    singleQuote: true,
    trailingComma: 'all',
    bracketSpacing: false,
    arrowParens: 'always',
    printWidth: 190,
    singleAttributePerLine: true,
    /** `importOrder` should be defined in an alphabetical order. */
    importOrder: [
        '@src/(.*)$',
    ],
    importOrderSortSpecifiers: true,
    importOrderCaseInsensitive: true,
};