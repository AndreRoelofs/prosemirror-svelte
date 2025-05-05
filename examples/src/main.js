import App from './App.svelte';
import { mount } from 'svelte';

const root = document.querySelector('#root');

const app = mount(App, {
	target: root,
	props: {}
});

export default app;
