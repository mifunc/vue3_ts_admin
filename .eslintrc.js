module.exports = {
	root: true, //是否开启 eslint
	parserOptions: {
		sourceType: 'module'
	},
	parser: 'vue-eslint-parser', // 解析器
	extends: ['plugin:vue/vue3-essential', 'plugin:vue/vue3-strongly-recommended', 'plugin:vue/vue3-recommended'],
	env: {
		browser: true, //浏览器环境中的全局变量。
		node: true, //Node.js 全局变量和 Node.js 作用域。
		es6: true  //启用除了 modules 以外的所有 ECMAScript 6 特性（该选项会自动设置 ecmaVersion 解析器选项为 6）
	},
	rules: {
		'no-console': 'off',
		'comma-dangle': [2, 'never'] //禁止使用拖尾逗号
	}
}