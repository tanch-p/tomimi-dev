<!--@component
use an svg icon that was provided through `Icons.svelte` from
- https://github.com/jacobmischka/svelte-feather-icon
- https://feathericons.com/
-->
<script>
	
	
	/**
	 * @typedef {Object} Props
	 * @property {string} name
	 * @property {string} [className]
	 * @property {string | number} [size]
	 */

	/** @type {Props} */
	let { name, className = "", size = 24 } = $props();
</script>

<svg width={size} height={size} class={className}>
	<use xlink:href="#{name}" />
</svg>