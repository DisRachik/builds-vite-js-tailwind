import Inspect from 'vite-plugin-inspect';
import checker from 'vite-plugin-checker';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import path from 'path';
import glob from 'fast-glob';
import { fileURLToPath } from 'url';
import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';

export default {
	plugins: [
		Inspect(),
		checker({
			eslint: {
				lintCommand: 'eslint "./**/*.js"',
			},
		}),
		ViteImageOptimizer({
			png: {
				quality: 86,
			},
			jpeg: {
				quality: 86,
			},
			jpg: {
				quality: 86,
			},
		}),
		{
			...imagemin(['./src/image/**/*.{jpg,png,jpeg}'], {
				destination: './src/image/webp/',
				plugins: [imageminWebp({ quality: 86 })],
			}),
		},
	],
	resolve: {
		alias: {
			styles: path.resolve(__dirname, './src/styles'),
			js: path.resolve(__dirname, './src/js'),
			images: path.resolve(__dirname, './src/images'),
		},
	},
	build: {
		rollupOptions: {
			input: Object.fromEntries(
				glob
					.sync(['./*.html', './pages/**/*.html'])
					.map(file => [
						path.relative(__dirname, file.slice(0, file.length - path.extname(file).length)),
						fileURLToPath(new URL(file, import.meta.url)),
					]),
			),
			output: {
				assetFileNames: 'assets/[name].[ext]',
			},
		},
	},
};
