<script lang="ts">
	import { onMount } from 'svelte';

	const dismissalKey = 'tomimi-latency-notice-dismissed';
	let dialog: HTMLDialogElement;

	onMount(() => {
		const hostname = window.location.hostname.toLowerCase().replace(/\.$/, '');
		if (hostname === 'tomimi.cyou' || hostname.endsWith('.tomimi.cyou')) return;

		try {
			if (localStorage.getItem(dismissalKey) === 'true') return;
		} catch {
			// The notice still works when browser storage is unavailable.
		}

		dialog.showModal();
	});

	function dismissPermanently() {
		try {
			localStorage.setItem(dismissalKey, 'true');
		} catch {
			// Allow dismissal even when browser storage is unavailable.
		}
		dialog.close();
	}
</script>

<dialog
	bind:this={dialog}
	aria-labelledby="latency-notice-title"
	aria-describedby="latency-notice-description"
	class="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-lg border-0 bg-white p-6 text-neutral-800 shadow-xl backdrop:bg-black/50 dark:bg-[#363636] dark:text-near-white"
>
	<h2 id="latency-notice-title" class="text-lg font-semibold">提示</h2>
	<p id="latency-notice-description" class="mt-3 leading-relaxed">
		如果遇到缓慢或加载问题，建议您访问
		<a href="https://tomimi.cyou/" class="text-sky-700 underline dark:text-sky-400">
			tomimi.cyou
		</a><br />可获得更低的延迟和更流畅的访问体验
	</p>
	<div class="mt-6 flex flex-wrap justify-end gap-3">
		<button
			type="button"
			onclick={dismissPermanently}
			class="rounded border border-neutral-400 px-4 py-2 hover:bg-neutral-100 dark:hover:bg-neutral-700"
		>
			不再显示
		</button>
		<button
			type="button"
			onclick={() => dialog.close()}
			class="rounded bg-sky-700 px-4 py-2 text-white hover:bg-sky-800"
		>
			暂时关闭
		</button>
	</div>
</dialog>
