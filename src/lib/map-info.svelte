<script>
	import IconButton from '@smui/icon-button';

	export let campaignId = null;
	export let point = null;

	let areaInfo = null;
	export let pointInfo = null;
	let isPointInfoVisible = false;

	let fetchPointInfo;

	async function fetchPoint(p) {
	if (p) {
	const response = await fetch('https://95.82.163.85:800/api/campaign/' + campaignId + '/map/' + point.latitude + '/' + point.longitude)
	return await response.json();
	} else {
	return null;
	}
	};

	$: fetchPointInfo = fetchPoint(point).then(r => pointInfo = r);
	$: isPointInfoVisible = pointInfo && pointInfo.isOnMap;

	let fetchAreaInfo = (async () => {
	const response = await fetch('https://95.82.163.85:800/api/campaign/' + campaignId + '/dimensions')
	return await response.json()
	})().then(r => areaInfo = r);
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

	span.eradicate {
	color: palegoldenrod;
	}
	
	.eradicate img {
		width: 100%;
		margin-top: 1em;
	}
</style>

	{#await fetchAreaInfo}
	{:then}
	{#if !isPointInfoVisible}
	<label>Area</label> {Math.round(areaInfo.area.width/100)/10}&times;{Math.round(areaInfo.area.height/100)/10}={Math.round(areaInfo.area.height*areaInfo.area.width/1e6*10)/10}&nbsp;KM<sup>2</sup>
	<label>Observation</label> {Math.round(areaInfo.totalObservationDays * 10)/10}&nbsp;days<br/>{areaInfo.sitesCount}&nbsp;sites
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
		<label>Cat</label> each {Math.round(1 / pointInfo.score.scores['Cat'].score / 2.4)/10}&nbsp;days<br/>
		seen for {Math.round(pointInfo.score.scores['Cat'].hoursWithAnimal)}&nbsp;hrs<br/>
		{Math.round(24 * 19.89 * pointInfo.score.scores['Cat'].score)/10}&nbsp;cats/km<sup>2</sup>
		{:else}
		<label>No cat</label>
		{/if}
		{/if}
		
		{#if pointInfo.isInProgress}
		<label>IN PROGRESS</label>{pointInfo.runInProgress.name} {pointInfo.runInProgress.catbox.name}
		{#if pointInfo.lastEradicateApplicationDate}
		<div class="eradicate">
		<img src="/eradicate-logo-for-dark-bkg-300pxw.png" />
		{pointInfo.lastEradicateApplicationDate.substring(0, pointInfo.lastEradicateApplicationDate.indexOf('T'))}
		</div>
		{/if}
		{/if}
		<IconButton href="/{campaignId}/site/{pointInfo.site.id}" class="material-icons">arrow_forward</IconButton>

{/if}
{:catch error}
<p>An error occurred!</p>
	{/await}

