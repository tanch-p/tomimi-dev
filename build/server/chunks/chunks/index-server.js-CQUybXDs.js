import { u as uneval } from './uneval.js-C7SIrMEV.js';
import { r as run, s as setContext, n as noop, h as hasContext, g as getContext, a as getAllContexts, c as createContext, b as ssr_context, l as lifecycle_function_unavailable, e as experimental_async_required, d as get_render_context, f as hydratable_serialization_failed } from './server2.js-B_Tmw9i4.js';

//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	__defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region node_modules/.pnpm/svelte@5.57.1_@typescript-eslint+types@8.70.0/node_modules/svelte/src/internal/server/abort-signal.js
function getAbortSignal() {
	let context = ssr_context;
	while (context !== null) {
		if (context.r !== null) return context.r.global.get_abort_signal();
		context = context.p;
	}
	return new AbortController().signal;
}
//#endregion
//#region node_modules/.pnpm/svelte@5.57.1_@typescript-eslint+types@8.70.0/node_modules/svelte/src/internal/server/hydratable.js
/** @import { HydratableLookupEntry } from '#server' */
/**
* @template T
* @param {string} key
* @param {() => T} fn
* @returns {T}
*/
function hydratable(key, fn) {
	experimental_async_required();
	const { hydratable } = get_render_context();
	let entry = hydratable.lookup.get(key);
	if (entry !== void 0) return entry.value;
	const value = fn();
	entry = encode(key, value, hydratable.unresolved_promises);
	hydratable.lookup.set(key, entry);
	return value;
}
/**
* @param {string} key
* @param {any} value
* @param {Map<Promise<any>, string>} [unresolved]
*/
function encode(key, value, unresolved) {
	/** @type {HydratableLookupEntry} */
	const entry = {
		value,
		serialized: ""
	};
	let uid = 1;
	entry.serialized = uneval(entry.value, (value, uneval) => {
		if (is_promise(value)) {
			const placeholder = `"${uid++}"`;
			const p = value.then((v) => {
				entry.serialized = entry.serialized.replace(placeholder, () => `r(${uneval(v)})`);
			}).catch((devalue_error) => hydratable_serialization_failed(key, serialization_stack(entry.stack, devalue_error?.stack)));
			unresolved?.set(p, key);
			p.catch(() => {}).finally(() => unresolved?.delete(p));
			(entry.promises ??= []).push(p);
			return placeholder;
		}
	});
	return entry;
}
/**
* @param {any} value
* @returns {value is Promise<any>}
*/
function is_promise(value) {
	return Object.prototype.toString.call(value) === "[object Promise]";
}
/**
* @param {string | undefined} root_stack
* @param {string | undefined} uneval_stack
*/
function serialization_stack(root_stack, uneval_stack) {
	let out = "";
	if (root_stack) out += root_stack + "\n";
	if (uneval_stack) out += "Caused by:\n" + uneval_stack + "\n";
	return out || "<missing stack trace>";
}
//#endregion
//#region node_modules/.pnpm/svelte@5.57.1_@typescript-eslint+types@8.70.0/node_modules/svelte/src/internal/server/blocks/snippet.js
/** @import { Snippet } from 'svelte' */
/** @import { Renderer } from '../renderer' */
/** @import { Getters } from '#shared' */
/**
* Create a snippet programmatically
* @template {unknown[]} Params
* @param {(...params: Getters<Params>) => {
*   render: () => string
*   setup?: (element: Element) => void | (() => void)
* }} fn
* @returns {Snippet<Params>}
*/
function createRawSnippet(fn) {
	return (renderer, ...args) => {
		var getters = args.map((value) => () => value);
		renderer.push(fn(...getters).render().trim());
	};
}
//#endregion
//#region node_modules/.pnpm/svelte@5.57.1_@typescript-eslint+types@8.70.0/node_modules/svelte/src/index-server.js
/** @import { SSRContext } from '#server' */
/** @import { Renderer } from './internal/server/renderer.js' */
var index_server_exports = /* @__PURE__ */ __exportAll({
	afterUpdate: () => noop,
	beforeUpdate: () => noop,
	createContext: () => createContext,
	createEventDispatcher: () => createEventDispatcher,
	createRawSnippet: () => createRawSnippet,
	flushSync: () => noop,
	fork: () => fork,
	getAbortSignal: () => getAbortSignal,
	getAllContexts: () => getAllContexts,
	getContext: () => getContext,
	hasContext: () => hasContext,
	hydratable: () => hydratable,
	hydrate: () => hydrate,
	mount: () => mount,
	onDestroy: () => onDestroy,
	onMount: () => noop,
	setContext: () => setContext,
	settled: () => settled,
	tick: () => tick,
	unmount: () => unmount,
	untrack: () => run
});
/** @param {() => void} fn */
function onDestroy(fn) {
	/** @type {Renderer} */ ssr_context.r.on_destroy(fn);
}
function createEventDispatcher() {
	return noop;
}
function mount() {
	lifecycle_function_unavailable("mount");
}
function hydrate() {
	lifecycle_function_unavailable("hydrate");
}
function unmount() {
	lifecycle_function_unavailable("unmount");
}
function fork() {
	lifecycle_function_unavailable("fork");
}
async function tick() {}
async function settled() {}

export { __commonJSMin as _, index_server_exports as i };
//# sourceMappingURL=index-server.js-CQUybXDs.js.map
