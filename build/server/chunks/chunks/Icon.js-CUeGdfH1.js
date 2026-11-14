import { ae as attr, af as attr_class, ag as clsx, ah as stringify } from './server2.js-B_Tmw9i4.js';

//#region src/lib/components/Icon.svelte
function Icon($$renderer, $$props) {
	/**
	* @typedef {Object} Props
	* @property {string} name
	* @property {string} [className]
	* @property {string | number} [size]
	*/
	/** @type {Props} */
	let { name, className = "", size = 24 } = $$props;
	$$renderer.push(`<svg${attr("width", size)}${attr("height", size)}${attr_class(clsx(className))}><use${attr("xlink:href", `#${stringify(name)}`)}></use></svg>`);
}

export { Icon as I };
//# sourceMappingURL=Icon.js-CUeGdfH1.js.map
