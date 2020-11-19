module.exports = {
    env: {
        commonjs: true,
        es2021: true,
        node: true,
        jest: true,
        es6: true,
        browser: true,
    },
    extends: ['airbnb-base', 'plugin:prettier/recommended'],
    parserOptions: {
        ecmaVersion: 12,
    },
    plugins: ['prettier'],
    rules: {
        'no-unused-vars': 0,
        'no-console': 'off',
        'max-classes-per-file': 0,
        'import/no-extraneous-dependencies': 0,
        'no-underscore-dangle': 0,
        'import/prefer-default-export': 0,
    },
}
