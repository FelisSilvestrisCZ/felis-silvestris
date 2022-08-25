<script>
	export let campaignId = null;

	let info = null;

	let fetchCampaignInfo = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId)
	return await response.json()
	})().then(r => info = r);
</script>

<style>
	.campaign-info {
	color: lightgray;
	}

	label, a {
	color: skyblue;
	font-weight: 500;
	margin: 0 0.5em;
	}

	label:first-child {
	margin-left: 0;
	}
</style>

<div class="campaign-info">
	{#await fetchCampaignInfo}
	<p>...waiting</p>
	{:then}
	<label>Campaign</label> {info.campaignName}
	<label>Start</label> {info.from}
	<label>Status</label> In progress
	{:catch error}
	<p>An error occurred!</p>
	{/await}
</div>
