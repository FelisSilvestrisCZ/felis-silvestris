<script>
	export let campaignId = null;
	export let point = null;
	
	let areaInfo = null;
	let pointInfo = null;
	let isPointInfoVisible = false;

	let fetchPointInfo;

	async function fetchPoint(p) {
	if (p) {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/map/' + point.latitude + '/' + point.longitude)
	return await response.json();
	} else {
	return null;
	}
	};

	$: fetchPointInfo = fetchPoint(point).then(r => pointInfo = r);
	$: isPointInfoVisible = pointInfo && pointInfo.isOnMap;

	let fetchAreaInfo = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/dimensions')
	return await response.json()
	})().then(r => areaInfo = r);
</script>

<style>
	.campaign-areaInfo {
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

<div class="campaign-areaInfo">
	{#await fetchAreaInfo}
	{:then}
	{#if !isPointInfoVisible}
	<label>Area</label> {Math.round(areaInfo.area.width/100)/10}&times;{Math.round(areaInfo.area.height/100)/10} KM
	<label>Observation</label> {Math.round(areaInfo.totalObservationDays * 10)/10} days &nbsp; {areaInfo.sitesCount} sites
	{/if}
	{:catch error}
	<p>An error occurred!</p>
	{/await}

	{#await fetchPointInfo}
	{:then}
	{#if isPointInfoVisible}
	<label>Site</label>{pointInfo.site.name}
	{#if pointInfo.score}
	<label>Observation</label>{Math.round(pointInfo.score.durationInDays * 10)/10} Days
	{#if pointInfo.score.scores['Cat'].score}
	<label>Cat</label> each {Math.round(1 / pointInfo.score.scores['Cat'].score / 2.4)/10} days &nbsp; seen for {Math.round(pointInfo.score.scores['Cat'].hoursWithAnimal)} hrs &nbsp;
	{Math.round(24 * 19.89 * pointInfo.score.scores['Cat'].score)/10} cats/km<sup>2</sup>
	{/if}
	{/if}
	{/if}
	{:catch error}
	<p>An error occurred!</p>
	{/await}
	&nbsp;
</div>
