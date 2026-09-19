<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import { GameConfig } from './objects/GameConfig';

	export let game,
		simulatedData,
		isSimulationRunning = false;

	$: totalTime = (Object?.keys(simulatedData?.t)?.length ?? 1) - 1;

	let seekbarElement, progressElement;
	let progress = 0;
	let tooltipPosition = 0;
	let tooltipTime = '00:00';
	let isHover = false;
	let isDragging = false;

	// Format time from seconds to MM:SS
	function formatTime(seconds) {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
	}
	function calculateLeftPosFromTime(time, seekbarElement) {
		if (!seekbarElement) return 0;
		const rect = seekbarElement.getBoundingClientRect();
		const percentage = time / totalTime;
		return percentage * rect.width;
	}

	// Calculate time from position
	function calculateTimeFromPosition(clientX) {
		if (!seekbarElement) return 0;

		const rect = seekbarElement.getBoundingClientRect();
		const position = clientX - rect.left;
		const percentage = position / rect.width;

		// Ensure percentage is between 0 and 1
		const clampedPercentage = Math.max(0, Math.min(1, percentage));
		return Math.floor(clampedPercentage * totalTime);
	}

	// Handle mouse move for tooltip
	function handleMouseMove(event) {
		if (!seekbarElement || isSimulationRunning) return;
		const rect = seekbarElement.getBoundingClientRect();
		const clientX = getClientX(event);
		const hoverPosition = clientX - rect.left;
		tooltipPosition = hoverPosition;

		const time = calculateTimeFromPosition(clientX);
		tooltipTime = formatTime(time);
		if (isDragging) {
			updateValue(time);
		}
	}
	function getClientX(event) {
		// Touch event
		if (event.touches && event.touches.length) {
			return event.touches[0].clientX;
		}
		// Mouse event
		return event.clientX;
	}

	function handleMouseEnter() {
		isHover = true;
	}
	function handleMouseLeave() {
		isHover = false;
	}

	// Start dragging
	function handleMouseDown(event) {
		if (isSimulationRunning) return;
		isDragging = true;
		GameConfig.setValue('isPaused', true);

		// Update position immediately
		handleMouseMove(event);

		// Add global event listeners for drag tracking
		window.addEventListener('mousemove', handleGlobalMouseMove);
		window.addEventListener('mouseup', handleGlobalMouseUp);

		// Add global event listeners for drag tracking (touch events)
		window.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
		window.addEventListener('touchend', handleGlobalTouchEnd, { passive: false });
		window.addEventListener('touchcancel', handleGlobalTouchEnd, { passive: false });

		// Prevent default to avoid text selection or page scrolling
		event.preventDefault();
	}

	// Track mouse movement globally when dragging
	function handleGlobalMouseMove(event) {
		if (isDragging) {
			handleMouseMove(event);
		}
	}
	// End dragging
	function handleGlobalMouseUp() {
		finishDragging();
	}
	function handleGlobalTouchMove(event) {
		if (isDragging) {
			handleMouseMove(event);
			event.preventDefault(); // Prevent page scrolling while dragging
		}
	}
	function handleGlobalTouchEnd() {
		finishDragging();
	}

	function finishDragging() {
		if (isDragging) {
			isDragging = false;
			GameConfig.setValue('isPaused', false);
			// Remove global event listeners (mouse)
			window.removeEventListener('mousemove', handleGlobalMouseMove);
			window.removeEventListener('mouseup', handleGlobalMouseUp);

			// Remove global event listeners (touch)
			window.removeEventListener('touchmove', handleGlobalTouchMove);
			window.removeEventListener('touchend', handleGlobalTouchEnd);
			window.removeEventListener('touchcancel', handleGlobalTouchEnd);
		}
	}

	function updateValue(time) {
		if (isSimulationRunning) return;
		if (time === GameConfig.scaledElapsedTime) return;
		GameConfig.setValue('scaledElapsedTime', time);
		if (game) {
			game.spawnManager.set(simulatedData.t[time]);
			game.gameManager.set(simulatedData.t[time]);
			game.setObstacleReplayTime(time);
		}
	}
	const unsubscribeFns = [];
	onMount(() => {
		unsubscribeFns.push(
			GameConfig.subscribe('scaledElapsedTime', (value) => {
				progress = (value / totalTime) * 100;
			})
		);
	});

	onDestroy(() => {
		unsubscribeFns.forEach((fn) => fn());
		// Clean up global event listeners if component is destroyed while dragging
		window.removeEventListener('mousemove', handleGlobalMouseMove);
		window.removeEventListener('mouseup', handleGlobalMouseUp);
	});
</script>

<div
	class="group absolute z-[1] bottom-[10px] md:bottom-[20px] left-1/2 -translate-x-1/2 flex items-center justify-center w-full max-w-[70vw] sm:max-w-[70%] {isSimulationRunning
		? 'opacity-40'
		: ''}"
	aria-busy={isSimulationRunning}
	aria-disabled={isSimulationRunning}
>
	<div class="absolute top-1/2 -translate-y-2/3 bg-[rgba(0,0,0,0.5)] w-full h-[40px] opacity-0" />
	<div
		class="relative w-full select-none touch-none {isSimulationRunning
			? 'cursor-wait pointer-events-none'
			: 'cursor-pointer'}"
		bind:this={seekbarElement}
		on:mousemove={handleMouseMove}
		on:mousedown={handleMouseDown}
		on:touchstart={handleMouseDown}
		on:mouseenter={handleMouseEnter}
		on:mouseleave={handleMouseLeave}
	>
		<div
			class="relative w-full bg-[#e6e6e6] overflow-hidden rounded h-[2px] group-hover:h-[6px] transition-[height]"
		>
			<div
				class="h-full bg-[#ff3e00] rounded relative"
				bind:this={progressElement}
				style="width: {progress}%;"
			/>
		</div>
		<div
			hidden={!isHover}
			class="absolute top-[-30px] z-[2] -translate-x-1/2 bg-[rgba(0,0,0,0.7)] rounded px-2 py-1 text-xs text-white select-none touch-none"
			style="left: {tooltipPosition}px;"
		>
			{tooltipTime}
		</div>
		{#each simulatedData?.enemiesToHighlight as { t, key }}
			{@const left = calculateLeftPosFromTime(t, seekbarElement)}
			<div
				class="absolute top-[-55px] z-[1] -translate-x-1/2 opacity-50 group-hover:opacity-100 transition-opacity select-none"
				style="left: {left}px;"
			>
				<img src="/images/enemy_icons/{key}.webp" width="50px" height="50px" alt={key} />
			</div>
			<div
				class="absolute z-[1] -translate-x-1/2 top-1/2 -translate-y-1/2 h-[6px] w-[2px] bg-gray-800 transition-[width] group-hover:w-[4px]"
				style="left: {left}px;"
			/>
		{/each}
	</div>
</div>
