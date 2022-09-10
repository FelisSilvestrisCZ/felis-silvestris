<script>
	import InfoRibbonItem from '$lib/info-ribbon-item.svelte'

	export let campaignId = null;
	export let record = null;

	let info = null;

	let fetchCampaignInfo = (async () => {
	const response = await fetch('https://localhost:800/api/campaign/' + campaignId)
	return await response.json()
	})().then(r => info = r);
</script>

{#await fetchCampaignInfo}
<p>...waiting</p>
{:then}
	
	<InfoRibbonItem>
		<span slot="label">Campaign</span>
		<span slot="value">
			{info.campaignName}<br/>
			start {info.from.substring(0, info.from.indexOf('T'))}<br/>
			in progress
		</span>
	</InfoRibbonItem>

{:catch error}
<p>An error occurred!</p>
{/await}

{#if record}
	<InfoRibbonItem>
		<span slot="label">Record</span>
		<span slot="value">
			{record.siteName} {record.runName}<br/>
			{record.dateTime.substring(0, record.dateTime.indexOf('+')).replace('T', ' ')}<br/>
			{#each record.tags as tag}
				#{tag}
			{/each}
		</span>
	</InfoRibbonItem>
{/if}



