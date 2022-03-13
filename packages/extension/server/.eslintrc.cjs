const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: '../.eslintrc.cjs',
	rules: {
		'import/no-extraneous-dependencies': [
			'error',
			{
				packageDir: [__dirname],
			},
		],
	},
});
