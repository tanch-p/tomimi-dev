<script lang="ts">
	import type { Language } from '$lib/types';
	import translations from '$lib/translations.json';
	import combat_icon from '$lib/images/is/combat_icon.webp';
	import emergency_icon from '$lib/images/is/emergency_icon.webp';
	import portal from '$lib/images/is/node_portal.webp';
	import gold from '$lib/images/is/rogue_gold.webp';
	import life from '$lib/images/is/hp_icon.webp';
	import relic from '$lib/images/is/relic.png';
	import totem from '$lib/images/is/totem.webp';
	import vision from '$lib/images/is/vision.webp';
	import drops from '$lib/data/is/drops.json';
	import TogglePanel from '$lib/components/TogglePanel.svelte';
	import Icon from '$lib/components/Icon.svelte';

	export let mapConfig, rogueTopic: string, language: Language, selectedFloor;
	const stagesToExclude = ['ro3_b_7', 'ro3_b_7_b'];
	$: isBossStage = mapConfig?.id.includes('_b_');
	$: isEventStage = mapConfig?.id.includes('_ev_') || mapConfig?.id.includes('_t_');
	$: isCombatStage = !isBossStage && !isEventStage;
</script>

{#if !stagesToExclude.includes(mapConfig?.id)}
	<div class="my-4">
		<TogglePanel title={translations[language].stage_rewards} size="subheading">
			<div class="px-2 sm:px-0 overflow-auto">
				{#if isCombatStage}
					<table class="border-collapse">
						<colgroup>
							<col width="50px" />
							<col />
							<col width="20%" />
							<col width="20%" />
							<col width="20%" />
							<col width="20%" />
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
								<th>
									<div class="flex items-center justify-center">
										<img
											src={portal}
											width="50px"
											decoding="async"
											loading="lazy"
											alt="combat ops"
											class=""
										/>
										<Icon name="right-arrow" />
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
								<th>
									<div class="flex items-center justify-center">
										<img
											src={portal}
											width="50px"
											decoding="async"
											loading="lazy"
											alt="combat ops"
											class=""
										/>
										<Icon name="right-arrow" />
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
							</tr>
						</thead>
						<tbody>
							<tr>
								<td />
								<td> {translations[language].exp}</td>
								<td colspan="2">{drops[rogueTopic].combat.exp[$selectedFloor - 1]}</td>
								<td colspan="2">{drops[rogueTopic].elite.exp[$selectedFloor - 1]}</td>
							</tr>
							<tr>
								<td>
									<img src={gold} width="35" alt={translations[language].rogue_gold} />
								</td>
								<td>{translations[language].rogue_gold}</td>
								<td colspan="2">{drops[rogueTopic].combat.gold[$selectedFloor - 1]}</td>
								<td colspan="2">{drops[rogueTopic].elite.gold[$selectedFloor - 1]}</td>
							</tr>
							<tr>
								<td>
									<img src={life} width="35" alt={translations[language].drop_lifepoint} />
								</td>
								<td>{translations[language].drop_lifepoint}</td>
								<td colspan="4">5%</td>
							</tr>
							<tr>
								<td>
									<img src={relic} width="35" alt={translations[language].relic_extra} />
								</td>
								<td>{translations[language].relic_extra}</td>
								<td colspan="4">5%</td>
							</tr>
							<tr>
								<td>
									<img src={totem} width="35" alt={translations[language].totem} />
								</td>
								<td>{translations[language].totem}</td>
								<td colspan="2">40%</td>
								<td colspan="2">80%</td>
							</tr>
							<tr>
								<td>
									<img src={vision} width="40" alt={translations[language].vision} />
								</td>
								<td> {translations[language].vision}*</td>
								<td>x 1 - 11.97%</td>
								<td>
									<p>x 1 - 79.17%</p>
									<p>x 2 - 6.25%</p>
								</td>
								<td>x1 - 15.04%</td>
								<td>
									<p>x 1 - 73.53%</p>
									<p>x 2 - 20.59%</p>
								</td>
							</tr>
							<tr>
								<td class="text-start noborder" colspan="5">
									* - {translations[language].data_estimate}
								</td>
							</tr>
						</tbody>
					</table>
				{:else if isEventStage}
					<table class="border-collapse">
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
								<th>
									<div class="flex items-center justify-center">
										<img
											src={portal}
											width="50px"
											decoding="async"
											loading="lazy"
											alt="combat ops"
											class=""
										/>
										<Icon name="right-arrow" />
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
							</tr>
						</thead>
						<tbody>
							<tr>
								<td />
								<td> {translations[language].exp}</td>
								<td colspan="2">{drops[rogueTopic][mapConfig?.id].exp}</td>
							</tr>
							<tr>
								<td>
									<img src={gold} width="35" alt={translations[language].rogue_gold} />
								</td>
								<td>{translations[language].rogue_gold}</td>
								<td colspan="2">{drops[rogueTopic][mapConfig?.id].gold}</td>
							</tr>
							<tr>
								<td>
									<img src={life} width="35" alt={translations[language].drop_lifepoint} />
								</td>
								<td>{translations[language].drop_lifepoint}</td>
								<td colspan="2">5%</td>
							</tr>
							{#if mapConfig?.id.includes('_ev_')}
								<tr>
									<td>
										<img src={relic} width="35" alt={translations[language].relic_extra} />
									</td>
									<td>{translations[language].relic_extra}</td>
									<td colspan="2">100%</td>
								</tr>
							{/if}
							<tr>
								<td>
									<img src={totem} width="35" alt={translations[language].totem} />
								</td>
								<td>{translations[language].totem}</td>
								<td colspan="2">40%</td>
							</tr>
							<tr>
								<td>
									<img src={vision} width="40" alt={translations[language].vision} />
								</td>
								<td> {translations[language].vision}*</td>
								<td>x 1 - 4.55%</td>
								<td> ? </td>
							</tr>
							<tr>
								<td class="text-start noborder" colspan="5">
									* - {translations[language].data_estimate}
								</td>
							</tr>
						</tbody>
					</table>
				{:else}
					{@const index = mapConfig?.floors.includes(3) ? 0 : mapConfig?.floors.includes(5) ? 1 : 2}
					<p>{translations[language].exp} - {drops[rogueTopic].boss.exp[index]}</p>
					<p>{translations[language].rogue_gold} - {drops[rogueTopic].boss.gold[index]}</p>
				{/if}
			</div>
		</TogglePanel>
	</div>
{/if}

<style>
	table {
		margin: 20px auto;
	}
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
	td > p {
		text-align: center;
	}
</style>
