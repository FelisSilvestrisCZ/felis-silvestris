<script>
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Button from '@smui/button';
	import CampaignRuns from '$lib/campaign-runs-table.svelte';

	export let campaignId;

	let campaign;
	let active = 'Runs';

	let fetchDefinition = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/definition')
	return await response.json()
	})().then(r => campaign = r);
</script>

<style>
	.campaign-view {
		padding: 2em;
	}
	a {
	color: skyblue;
	}
</style>

{#await fetchDefinition}
<p>...waiting</p>
{:then}
	<div class="campaign-view">
		<h1>{campaign.name}</h1>
		  <TabBar tabs={['Runs', 'Sites', 'Catboxes']} let:tab bind:active>
		<!-- Note: the `tab` property is required! -->
		<Tab {tab}>
		  <Label>{tab}</Label>
		</Tab>
	  </TabBar>
		{#if active == 'Runs'}
		<CampaignRuns bind:campaign={campaign} />
		{/if}
	</div>
{:catch error}
<p>An error occurred!</p>
{/await}


