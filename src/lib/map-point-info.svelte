<script>
	export let campaignId = null;

</script>

<style>
	.map-point-pointInfo {
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

<div class="map-point-pointInfo">
	{#await fetchPointInfo}
	<p>...waiting</p>
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
</div>
