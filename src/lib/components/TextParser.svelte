<script lang="ts">
	import { page } from '$app/stores';
	import { getTooltipHtml, renderTextLine } from '$lib/functions/textParser';
	import type { Language } from '$lib/types';

	const TOOLTIP_WIDTH = 220;

	type ActiveTooltip = {
		anchor: HTMLElement;
		html: string;
		style: string;
	};

	export let line: string;
	export let className = '';
	export let language: Language | undefined = undefined;

	let container: HTMLElement;
	let activeTooltips: ActiveTooltip[] = [];
	$: activeLanguage = language ?? $page.data.language;
	$: parsedLine = renderTextLine(line, activeLanguage);

	function openTooltip(target: EventTarget | null) {
		if (!(target instanceof Element)) {
			return;
		}

		const termElement = target.closest<HTMLElement>('[data-term]');
		if (!termElement || !container.contains(termElement)) {
			return;
		}

		const term = termElement.dataset.term;
		if (!term) {
			return;
		}
		const html = getTooltipHtml(term, activeLanguage);
		if (!html) {
			return;
		}

		const parentTooltip = termElement.closest<HTMLElement>('[data-text-parser-tooltip]');
		const parentIndex = Number(parentTooltip?.dataset.tooltipIndex);
		const tooltipIndex = parentTooltip && Number.isInteger(parentIndex) ? parentIndex + 1 : 0;
		const existingIndex = activeTooltips.findIndex((tooltip) => tooltip.anchor === termElement);
		if (existingIndex !== -1) {
			activeTooltips = activeTooltips.slice(0, existingIndex + 1);
			return;
		}

		activeTooltips = [
			...activeTooltips.slice(0, tooltipIndex),
			{ anchor: termElement, html, style: getTooltipPosition(termElement) }
		];
	}

	function handleFocusOut(event: FocusEvent) {
		const nextTarget = event.relatedTarget;
		if (!(nextTarget instanceof Element) || !container.contains(nextTarget)) {
			activeTooltips = [];
			return;
		}

		if (!nextTarget.closest('[data-term]')) {
			activeTooltips = [];
		}
	}

	function handlePointerOut(event: PointerEvent) {
		const nextTarget = event.relatedTarget;
		if (
			nextTarget instanceof Element &&
			container.contains(nextTarget) &&
			nextTarget.closest('[data-term], [data-text-parser-tooltip]')
		) {
			return;
		}

		const focusedElement = document.activeElement;
		if (
			focusedElement instanceof HTMLElement &&
			container.contains(focusedElement) &&
			focusedElement.matches('[data-term]')
		) {
			return;
		}

		activeTooltips = [];
	}

	function handleKeydown(event: KeyboardEvent) {
		if (event.key !== 'Escape') {
			return;
		}

		activeTooltips = [];
		if (event.target instanceof HTMLElement) {
			event.target.blur();
		}
	}

	function getTooltipPosition(anchor: HTMLElement): string {
		if (!container) {
			return '';
		}

		const boundary = anchor.closest('.popup') ?? anchor.closest('main') ?? container;
		const boundaryRect = boundary.getBoundingClientRect();
		const containerRect = container.getBoundingClientRect();
		const anchorRect = anchor.getBoundingClientRect();
		const idealLeft = anchorRect.left + anchorRect.width / 2 - TOOLTIP_WIDTH / 2;
		const left = Math.min(
			Math.max(idealLeft, boundaryRect.left),
			boundaryRect.right - TOOLTIP_WIDTH
		);

		return `left: ${left - containerRect.left}px; top: ${
			anchorRect.bottom - containerRect.top + 4
		}px;`;
	}
</script>

<div
	bind:this={container}
	class="relative {className}"
	on:focusin={(event) => openTooltip(event.target)}
	on:focusout={handleFocusOut}
	on:click={(event) => openTooltip(event.target)}
	on:keydown={handleKeydown}
	on:pointerover={(event) => openTooltip(event.target)}
	on:pointerout={handlePointerOut}
>
	{@html parsedLine}
	{#each activeTooltips as tooltip, index (tooltip.anchor)}
		<div
			class="absolute bg-slate-200 text-[#222222] w-[220px] p-1.5 -mt-1 z-[1] rounded-md text-sm shadow-inner"
			data-text-parser-tooltip
			data-tooltip-index={index}
			role="tooltip"
			style={tooltip.style}
		>
			{@html tooltip.html}
		</div>
	{/each}
</div>
