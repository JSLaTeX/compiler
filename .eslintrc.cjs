const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: [require.resolve('@leonzalion/configs/eslint.cjs')],
	rules: {
		'unicorn/filename-case': 'off',
	},
});
