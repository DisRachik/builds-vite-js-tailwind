module.exports = {
	root: true,
	env: {
		commonjs: true,
		es6: true,
		es2022: true,
		node: true,
	},
	extends: ['airbnb-base', 'plugin:prettier/recommended'],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 2018,
	},
	rules: {
		indent: ['error', 2],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'prettier/prettier': [
			'error',
			{
				endOfLine: 'auto',
			},
		],
	},
	settings: {
		'import/resolver': {
			node: {
				paths: ['./src'],
				alias: {
					styles: './src/styles',
					js: './src/js',
					images: './src/images',
				},
			},
		},
	},
	ignorePatterns: ['/vite.config.js', '/postcss.config.js', '/tailwind.config.js', '/dist/**'],
};
