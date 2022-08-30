<script>
	export let campaignId = null;

	let info = null;

	let fetchCampaignInfo = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId)
	return await response.json()
	})().then(r => info = r);
</script>

<style>
	label {
	color: skyblue;
	font-weight: 500;
	display: block;
	margin-top: 0.5em;
	}

	label:first-child {
	margin-top: 0;
	}
</style>


	{#await fetchCampaignInfo}
	<p>...waiting</p>
	{:then}
	<label>Campaign</label> {info.campaignName}
	<label>Start</label> {info.from.substring(0, info.from.indexOf('T'))}
	<label>Status</label> In progress
	{:catch error}
	<p>An error occurred!</p>
	{/await}

