<script>
	import InfoRibbonItem from '$lib/info-ribbon-item.svelte'

	export let campaignId = null;

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
			{info.campaignName}
		</span>
	</InfoRibbonItem>

	<InfoRibbonItem>
		<span slot="label">When</span>
		<span slot="value">
			{info.from.substring(0, info.from.indexOf('T'))}<br/>
			In progress
		</span>
	</InfoRibbonItem>

	{:catch error}
	<p>An error occurred!</p>
	{/await}

