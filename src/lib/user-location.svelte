<script>
	import Geolocation from "svelte-geolocation";

	export let campaignId;
	
	let coords;

	let pointInfo = null;

	let fetchPointInfo;

	async function fetchPoint(p) {
	if (p && campaignId) {
	const response = await fetch('https://localhost:800/api/campaign/' + campaignId + '/user-location/' + p[1] + '/' + p[0])
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
	{#await fetchPointInfo}
	{:then}
		{#if pointInfo.isUserInCampaignArea}
			You are within the observation area
		{:else}
			You are {Math.round(pointInfo.distanceToCenterOfCampaignArea/100)/10.0} km from the campaign target area.
		{/if}
	{:catch error}
	{/await}
</pre>

