<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import portal from '$lib/images/is/node_portal.webp';
	import gold from '$lib/images/is/rogue_gold.webp';
	import life from '$lib/images/is/hp_icon.webp';
	import drops from '$lib/data/is/drops.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let mapConfig, rogueTopic: string, language: Language, selectedFloor;

	let dropData;

	$: dropData = drops[rogueTopic][mapConfig?.id];
</script>

{#if dropData}
	<div class="my-4">
		<TogglePanel title={translations[language].stage_rewards} size="subheading">
			<div class="px-2 sm:px-0 overflow-auto">
				<table class="border-collapse mt-4 sm:mx-auto w-full sm:w-auto">
					<colgroup>
						<col width="50px" />
						<col />
						<col />
						{#if dropData?.exp?.[1]}
							<col />
						{/if}
					</colgroup>
					<thead>
						<tr>
							<th colspan="2" class="noborder border-t border-l" />
							<th>
								<div class="flex items-center justify-center">
									<img
										src={combat_icon}
										width="50px"
										decoding="async"
										loading="lazy"
										alt="combat ops"
										class=""
									/>
								</div>
							</th>
							{#if dropData?.exp?.[1]}
								<th>
									<div class="flex items-center justify-center">
										<img
											src={emergency_icon}
											width="50px"
											decoding="async"
											loading="lazy"
											alt="combat ops"
											class=""
										/>
									</div>
								</th>
							{/if}
						</tr>
					</thead>
					<tbody>
						<tr>
							<td />
							<td> {translations[language].exp}</td>
							<td colspan="1">
								{dropData?.exp?.[0]}
							</td>
							{#if dropData?.exp?.[1]}
								<td colspan="1">
									{dropData?.exp?.[1]}
								</td>
							{/if}
						</tr>
						<tr>
							<td>
								<img src={gold} width="35" alt={translations[language].rogue_gold} />
							</td>
							<td>{translations[language].rogue_gold}</td>
							<td colspan="1">
								{dropData?.gold?.[0] || drops[rogueTopic].floor_gold[$selectedFloor - 1][0]}
							</td>
							{#if dropData?.exp?.[1]}
								<td colspan="1">
									{dropData?.gold?.[1] || drops[rogueTopic].floor_gold[$selectedFloor - 1][1]}
								</td>
							{/if}
						</tr>
						<tr>
							<td />
							<td> {translations[language].ro4_fragment}*</td>
							<td colspan="2">
								<div>2 - 33%</div>
								<div>3 - 66%</div>
							</td>
						</tr>
						<tr>
							<td class="text-start noborder" colspan="5">
								* {translations[language].ro4_fragment_imperfect}
								<a
									href="https://www.bilibili.com/video/BV1PHS4Y7ExF/"
									target="_blank"
									rel="noopener noreferrer"
									class="text-blue-400 hover:text-blue-300">万物汇集#15</a
								>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</TogglePanel>
	</div>
{/if}

<style>
	th {
		padding: 8px 8px;
	}
	th:not(.noborder) {
		border: 1px solid;
	}
	td {
		white-space: nowrap;
	}
	td:nth-child(n + 3) {
		border: 1px solid;
		padding: 8px;
	}
	td:first-child:not(.noborder) {
		border-left: 1px solid;
		border-bottom: 1px solid;
		border-top: 1px solid;
	}
	td:nth-child(2) {
		border-bottom: 1px solid;
		border-top: 1px solid;
		padding-right: 8px;
		padding-left: 4px;
	}

	td:nth-child(n + 3) {
		text-align: center;
		padding: 10px 10px;
	}
	td:first-child {
		padding: 4px 0 4px 8px;
		min-width: 35px;
	}
</style>
