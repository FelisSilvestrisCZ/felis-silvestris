<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Map from '$lib/map.svelte'
	import InfoRibbon from '$lib/info-ribbon.svelte'
	import MapInfo from '$lib/map-info.svelte'

	export let campaignId;

	let map;
	let clickLatLon;
	let pointInfo;
	let selectedOverlay;

	export let selectedSite = null;

	$: selectedSite = pointInfo?.site;

	let handleMapClick = ((m, lat, lon) => {
	clickLatLon = {latitude: lat, longitude: lon};
	});

	let fetchMap = (async () => {
	const response = await fetch('https://localhost:800/api/campaign/' + campaignId + '/map')
	return await response.json()
	})().then(r => {
		map = r;
		selectedOverlay = map.overlays[0].name;
	}
	);
</script>

<style>
	a {
	color: skyblue;
	}
</style>

{#await fetchMap}
<p>...waiting</p>
{:then}
<Map map={map} onClick={handleMapClick} bind:selectedOverlay={selectedOverlay} />
{:catch error}
<p>An error occurred!</p>
{/await}
<InfoRibbon>
	<MapInfo bind:mapData={map} bind:campaignId={campaignId} bind:point={clickLatLon} bind:pointInfo={pointInfo} bind:selectedOverlay={selectedOverlay} />
</InfoRibbon>
{#if pointInfo?.site}
	{#await goto('/' + campaignId + '/map/' + pointInfo.site.id)}
	{/await}
{/if}


