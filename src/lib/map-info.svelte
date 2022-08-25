<script>
	export let campaignId = null;

	let info = null;

	let fetchAreaInfo = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/dimensions')
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

	label:first-sibling {
	margin-left: 0;
	}
</style>

<div class="campaign-info">
	{#await fetchAreaInfo}
	<p>...waiting</p>
	{:then}
	<label>Area</label> {Math.round(info.area.width/100)/10}&times;{Math.round(info.area.height/100)/10} KM
	<label>Observation</label> {Math.round(info.totalObservationDays * 10)/10} days at {info.sitesCount} sites
	{:catch error}
	<p>An error occurred!</p>
	{/await}
</div>
