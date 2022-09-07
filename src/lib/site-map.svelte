<script>
	import Map from './map.svelte'
	import InfoRibbon from '$lib/info-ribbon.svelte'
	import MapInfo from '$lib/map-info.svelte'

	export let campaignId;
	export let siteId;
	
	let map;
	let clickLatLon;

	let handleMapClick = ((m, lat, lon) => {
	clickLatLon = {latitude: lat, longitude: lon};
	});

	let fetchMap = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/site/' + siteId + '/map')
	return await response.json()
	})().then(r => map = r);
</script>

<style>
	a {
	color: skyblue;
	}
</style>

{#await fetchMap}
<p>...waiting</p>
{:then}
<Map map={map} onClick={handleMapClick} />
{:catch error}
<p>An error occurred!</p>
{/await}
<InfoRibbon>
	<MapInfo bind:campaignId={campaignId} bind:point={clickLatLon} />
</InfoRibbon>


