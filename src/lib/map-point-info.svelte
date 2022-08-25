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
	{#await fetchPointInfo}
	<p>...waiting</p>
	{:then}
	{#if info} {#if info.isOnMap}
	<label>{info.site.name}</label>{Math.round(info.distanceToSite)} M
	{/if} {/if}
	{:catch error}
	<p>An error occurred!</p>
	{/await}
</div>
