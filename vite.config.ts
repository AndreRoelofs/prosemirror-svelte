import { defineConfig, searchForWorkspaceRoot } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	base: './',
	root: searchForWorkspaceRoot(process.cwd()),
	plugins: [svelte()],
	server: {
		port: 5173,
	},
});
