const { defineConfig } = require('eslint-define-config');

module.exports = defineConfig({
	extends: [require.resolve('@leonzalion/configs/eslint.cjs')],
});
