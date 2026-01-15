<script lang="ts">
	import TextParser from './TextParser.svelte';
	interface Props {
		text: string;
		position?: string;
	}

	let { text, position = 'bottom' }: Props = $props();

	const positionStyles = {
		top: 'bottom-full',
		bottom: '',
		right:""
	};
</script>

<div
	class={`absolute hidden group-hover:block left-[50%] -translate-x-[50%] bg-slate-300 text-[#222222] w-[220px] p-1.5 z-1 rounded-md text-sm shadow-md ${positionStyles[position]}`}
>
	<TextParser line={text} />
</div>
