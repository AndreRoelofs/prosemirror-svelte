<script lang="ts" module>
	import type { NodeSpec } from 'prosemirror-model';

	export interface EquationAttrs {
		id: string | undefined;
		title: string;
		latex: string;
	}

	export const equationAttrs: EquationAttrs = {
		id: undefined,
		title: '',
		latex: ''
	};

	export const equationSchema: NodeSpec = {
		attrs: Object.entries(equationAttrs).reduce(
			(acc, [key, value]) => ({ ...acc, [key]: { default: value } }),
			{}
		),
		content: 'inline*',
		group: 'block',
		atom: true,
		// @TODO customize NodeSpec, add -> attrs, selectors
		parseDOM: [
			{
				tag: 'figure.equation',
				getAttrs: (dom: HTMLElement | string) => {
					if (dom instanceof HTMLElement) {
						return {
							id: dom.getAttribute('id'),
							latex: dom.getAttribute('latex')
						};
					}
					return null;
				}
			}
		],
		toDOM(node: PMNode) {
			const { id, latex } = node.attrs;
			return ['figure', { id, class: 'equation', latex }, ['pre', latex], ['figcaption', {}]];
		}
	};
</script>

<script lang="ts">
	import { EditorState } from '@codemirror/state';
	import { EditorView as CodeMirror, lineNumbers, placeholder, ViewUpdate } from '@codemirror/view';
	import { createPopper } from '@popperjs/core';
	import katex from 'katex';
	import { Node as PMNode } from 'prosemirror-model';
	import { onMount } from 'svelte';
	import type { SvelteNodeViewProps } from '@prosemirror-svelte/core';
	import type { Instance } from '@popperjs/core';

	import 'katex/dist/katex.min.css';

	export interface Props extends SvelteNodeViewProps<EquationAttrs> {
		node: PMNode;
		attrs: EquationAttrs;
		selected: boolean | undefined;
		ref: HTMLElement;
	}

	let { node, attrs, selected, ref }: Props = $props();

	let codemirrorEl: HTMLElement | undefined = $state();
	let katexEl: HTMLElement | undefined = $state();
	let popperEl: HTMLElement;
	let popperInstance: Instance | undefined;
	let codemirror: CodeMirror | undefined;

	onMount(() => {
		if (!node || !katexEl || !codemirrorEl) return;
		popperEl = document.createElement('div');
		popperEl.classList.add('popup');
		document.body.appendChild(popperEl);
		codemirrorEl.remove();
		if (latex) {
			katex.render(latex, katexEl, {
				throwOnError: false
			});
		}
		// return () => {
		// 	document.body.removeChild(popperEl);
		// 	codemirror?.destroy();
		// 	closePopper();
		// };
	});

	export function destroy() {
		closePopper();
		document.body.removeChild(popperEl);
		codemirror?.destroy();
	}

	function openPopper(anchor: HTMLElement, content: HTMLElement) {
		const arrow = document.createElement('div');
		// https://popper.js.org/docs/v2/modifiers/arrow/
		// arrow.setAttribute('data-popper-arrow', '')
		arrow.classList.add('popper-arrow');
		popperEl.appendChild(arrow);
		popperEl.appendChild(content);
		popperInstance = createPopper(anchor, popperEl, {
			placement: 'bottom',
			modifiers: [
				{
					name: 'offset',
					options: {
						offset: [0, 8]
					}
				}
			]
		});
	}

	function closePopper() {
		codemirror?.destroy();
		codemirror = undefined;
		popperEl?.firstChild?.remove();
		popperEl?.firstChild?.remove();
		popperInstance?.destroy();
		popperInstance = undefined;
	}

	function handleCodeMirrorChange(v: ViewUpdate) {
		if (!v.docChanged) {
			return;
		}
		const updatedLatex = v.view.state.doc.toJSON().join('\n');
		latex = updatedLatex;
	}

	function renderCodeMirror() {
		if (!codemirror) {
			codemirror = new CodeMirror({
				parent: codemirrorEl,
				state: EditorState.create({
					doc: latex,
					extensions: [
						placeholder('Enter LaTeX equation, e.g. "a^2 = \\sqrt{b^2 + c^2}"'),
						lineNumbers(),
						CodeMirror.lineWrapping,
						CodeMirror.updateListener.of(handleCodeMirrorChange)
					]
				})
			});
			if (!katexEl || !codemirrorEl) return;

			openPopper(katexEl, codemirrorEl);

			window.requestAnimationFrame(() => {
				codemirror?.focus();
			});
		}
	}

	function handleKeyDown(ev: KeyboardEvent) {
		console.log(ev.key);
		if (ev.key === 'Enter') {
			renderCodeMirror();
		}
	}
	let id = $derived(attrs.id);
	let latex = $derived(attrs.latex);

	$effect(() => {
		if (katexEl && latex) {
			katex.render(latex, katexEl, {
				throwOnError: false
			});
		}
	});
	$effect(() => {
		if (selected) {
			renderCodeMirror();
		} else {
			closePopper();
		}
	});
</script>

<div class="equation-editor" bind:this={codemirrorEl}>
	<a
		class="equation-editor-info"
		href="https://en.wikibooks.org/wiki/LaTeX/Mathematics#Symbols"
		target="_blank"
		rel="noreferrer"
	>
		?
	</a>
</div>
<figure class="equation" {id} bind:this={ref}>
	<div
		class="equation"
		role="button"
		tabindex="-1"
		data-latex={latex}
		onclick={renderCodeMirror}
		onkeydown={handleKeyDown}
	>
		{#if !latex}
			<div class="equation-placeholder">e=mc^2</div>
		{:else}
			<div bind:this={katexEl}></div>
		{/if}
	</div>
	<figcaption data-hole></figcaption>
</figure>

<style lang="postcss">
	:global(.equation) {
		text-align: center;
	}
	:global(.popup) {
		color: #353535;
		font-family: 'PT Sans', sans-serif;
		min-width: 100px;
		position: absolute;
		width: auto;
		z-index: 5;
		opacity: 1;
	}

	:global(.popup[data-show]) {
		display: inline-block;
	}

	:global(.popper-arrow) {
		width: 0;
		height: 0;
		position: absolute;
		border: 5px solid transparent;
	}

	:global(.popup[data-popper-placement^='bottom']) > :global(.popper-arrow) {
		top: -5px;
		left: calc(50% - 5px);
		border-bottom-color: #e2e2e2;
		border-top-width: 0;
	}

	:global(.popup[data-popper-placement^='top']) > :global(.popper-arrow) {
		bottom: -5px;
		left: calc(50% - 5px);
		border-top-color: #e2e2e2;
		border-bottom-width: 0;
		margin: 0 5px;
	}

	:global(.popup[data-popper-placement^='left']) > :global(.popper-arrow) {
		right: -5px;
		top: calc(50% - 5px);
		border-left-color: #e2e2e2;
		border-right-width: 0;
		margin: 5px 0;
	}

	:global(.popup[data-popper-placement^='right']) > :global(.popper-arrow) {
		left: -5px;
		top: calc(50% - 5px);
		border-right-color: #e2e2e2;
		border-left-width: 0;
		margin: 5px 0;
	}

	:global(.popup .equation-editor) {
		position: relative;
		min-width: calc(600px - 2rem);
		max-width: 800px;
	}

	:global(.popup .visible) {
		display: block;
	}

	:global(.popup .equation-editor-info) {
		align-items: center;
		border: 1px solid #e2e2e2;
		border-radius: 50%;
		bottom: 6px;
		color: #6e6e6e;
		display: inline-flex;
		cursor: pointer;
		font-size: 12px;
		height: 16px;
		justify-content: center;
		opacity: 0.5;
		position: absolute;
		right: 6px;
		text-decoration: none;
		width: 16px;
		z-index: 2;
	}

	:global(.popup .equation-editor-info:hover) {
		opacity: 1;
	}

	:global(.popup) {
		:global(.cm-editor) {
			border: 1px solid #e2e2e2;
			box-shadow: 0 4px 9px 0 rgba(84, 83, 83, 0.3);
			height: auto;
			min-height: 4em;
		}
		:global(.cm-focused) {
			outline: none;
		}
		:global(.cm-content),
		:global(.cm-gutter) {
			min-height: 62px;
		}
		:global(.cm-gutters) {
			margin: 1px;
		}
		:global(.cm-scroller) {
			overflow: auto;
		}
		:global(.cm-wrap) {
			border: 1px solid silver;
		}
		:global(.cm-placeholder) {
			color: #999 !important;
		}
	}
</style>
