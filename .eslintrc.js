const DOMGlobals = ['window', 'document']
const NodeGlobals = ['module', 'require']

module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module'
  },
  rules: {
    'no-unused-vars': [
      'error',
      { varsIgnorePattern: '.*', args: 'none' }
    ],
    'no-restricted-globals': ['error', ...DOMGlobals, ...NodeGlobals],
    'no-restricted-syntax': [
      'error',
      'ObjectExpression > SpreadElement',
      'ObjectPattern > RestElement'
    ]
  },
  overrides: [
    {
      files: ['packages/extraStr/**'],
      rules: {
        'no-restricted-globals': ['error', ...DOMGlobals],
        'no-restricted-syntax': 'off'
      }
    }
  ]
}