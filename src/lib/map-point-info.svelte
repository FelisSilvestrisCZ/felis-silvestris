<script>
	export let campaignId = null;
	export let point = null;

	let info = null;

	let fetchPointInfo;
	
	async function fetchPoint(p) {
	if (p) {
		const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/map/' + point.latitude + '/' + point.longitude)
		return await response.json();
		} else {
		return null;
		}
	};
	
	$: fetchPointInfo = fetchPoint(point).then(r => info = r);
</script>

<style>
	.map-point-info {
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

<div class="map-point-info">
	{#await fetchPointInfo}
	<p>...waiting</p>
	{:then}
	{#if info} {#if info.isOnMap}
	<label>Site</label>{info.site.name}
	{#if info.score}
		<label>Observation</label>{Math.round(info.score.durationInDays * 10)/10} Days
	{#if info.score.scores['Cat'].score}
	<label>Cat</label> each {Math.round(1 / info.score.scores['Cat'].score / 2.4)/10} days &nbsp; seen for {Math.round(info.score.scores['Cat'].hoursWithAnimal)} hrs &nbsp;
	{Math.round(24 * 19.89 * info.score.scores['Cat'].score)/10} cats/km<sup>2</sup>
	{/if}
	{/if}
	{/if} {/if}
	{:catch error}
	<p>An error occurred!</p>
	{/await}
</div>
