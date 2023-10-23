module.exports = {
    env: {
        node: true,
        browser: true,
        commonjs: true,
        es2021: true,
    },
    extends: ['eslint:recommended', 'prettier'],
    overrides: [
        {
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
    },
    rules: {},
};
