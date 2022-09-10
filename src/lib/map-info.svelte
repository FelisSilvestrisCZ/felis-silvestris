<script>
	import InfoRibbonItem from '$lib/info-ribbon-item.svelte'

	export let campaignId = null;
	export let point = null;

	let areaInfo = null;
	export let pointInfo = null;
	let isPointInfoVisible = false;

	let fetchPointInfo;

	async function fetchPoint(p) {
	if (p) {
	const response = await fetch('https://localhost:800/api/campaign/' + campaignId + '/map/' + point.latitude + '/' + point.longitude)
	return await response.json();
	} else {
	return null;
	}
	};

	$: fetchPointInfo = fetchPoint(point).then(r => pointInfo = r);
	$: isPointInfoVisible = pointInfo && pointInfo.isOnMap;

	let fetchAreaInfo = (async () => {
	const response = await fetch('https://localhost:800/api/campaign/' + campaignId + '/dimensions')
	return await response.json()
	})().then(r => areaInfo = r);
</script>

	{#await fetchAreaInfo}
	{:then}
	<InfoRibbonItem>
		<span slot="label">Area</span>
		<span slot="value">
			{Math.round(areaInfo.area.width/100)/10}&times;{Math.round(areaInfo.area.height/100)/10}={Math.round(areaInfo.area.height*areaInfo.area.width/1e6*10)/10}&nbsp;km<sup>2</sup>
		</span>
	</InfoRibbonItem>	
	<InfoRibbonItem>
		<span slot="label">Observation</span>
		<span slot="value">
			{Math.round(areaInfo.totalObservationDays * 10)/10}&nbsp;days<br/>{areaInfo.sitesCount}&nbsp;sites
		</span>
	</InfoRibbonItem>	
	{:catch error}
	<p>An error occurred!</p>
	{/await}

	{#await fetchPointInfo}
	{:then}

	{#if isPointInfoVisible}
	<InfoRibbonItem>
		<span slot="label">Site</span>
		<span slot="value">{pointInfo.site.name}</span>
	</InfoRibbonItem>

	{#if pointInfo.score}
	<InfoRibbonItem>
		<span slot="label">Observation</span>
		<span slot="value">{Math.round(pointInfo.score.durationInDays * 10)/10} days</span>
	</InfoRibbonItem>
	
	{#if pointInfo.score.scores['Cat'].score}
	<InfoRibbonItem>
		<span slot="label">Cat</span>
		<span slot="value">
			each {Math.round(1 / pointInfo.score.scores['Cat'].score / 2.4)/10}&nbsp;days<br/>
			seen for {Math.round(pointInfo.score.scores['Cat'].hoursWithAnimal)}&nbsp;hrs<br/>
			{Math.round(24 * 19.89 * pointInfo.score.scores['Cat'].score)/10}&nbsp;cats/km<sup>2</sup>	
		</span>
	</InfoRibbonItem>
	{/if}
	{/if}
		
	{#if pointInfo.isInProgress}
	<InfoRibbonItem>
		<span slot="label">In progress</span>
		<span slot="value">
			{pointInfo.runInProgress.name} {pointInfo.runInProgress.catbox.name}
		</span>
	</InfoRibbonItem>
	{/if}
	
	{#if pointInfo.lastEradicateApplicationDate}
	<InfoRibbonItem>
		<span slot="label">Eradicate!</span>
		<span slot="value">
			{pointInfo.lastEradicateApplicationDate.substring(0, pointInfo.lastEradicateApplicationDate.indexOf('T'))}<br/>
			{Math.round(pointInfo.daysSinceLastEradicateApplication * 10)/10} days ago
		</span>
	</InfoRibbonItem>
	{/if}

	{/if}
{:catch error}
<p>An error occurred!</p>
	{/await}

