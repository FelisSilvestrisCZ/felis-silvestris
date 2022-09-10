<script>
	import Geolocation from "svelte-geolocation";

	export let campaignId;
	
	let coords;

	let pointInfo = null;

	let fetchPointInfo;

	async function fetchPoint(p) {
	if (p && campaignId) {
	const response = await fetch('https://localhost:800/api/campaign/' + campaignId + '/map/' + p[1] + '/' + p[0])
	return await response.json();
	} else {
	return null;
	}
	};

	$: fetchPointInfo = fetchPoint(coords).then(r => pointInfo = r);

</script>
<style>
	pre {
		position: fixed;
		z-index: 10;
		background-color: yellow;
	}
</style>

<Geolocation getPosition bind:coords />

<pre>
	{JSON.stringify(coords)}
	{#await fetchPointInfo}
	{:then}
		<!--{JSON.stringify(pointInfo)}-->
		{#if pointInfo.isOnMap}
			{pointInfo.site.name}
		{:else}
			Not on map
		{/if}
	{:catch error}
	{/await}
</pre>

