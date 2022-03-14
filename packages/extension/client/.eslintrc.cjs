const path = require('path');
const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: '../.eslintrc.cjs',
	parserOptions: { project: path.resolve(__dirname, 'tsconfig.eslint.json') },
	rules: {
		'import/no-extraneous-dependencies': [
			'error',
			{
				packageDir: [
					path.resolve(__dirname, '..'),
					path.resolve(__dirname, '../../..'),
				],
			},
		],
		// Not supported in VSCode extension clients
		'unicorn/prefer-node-protocol': 'off',
	},
});
