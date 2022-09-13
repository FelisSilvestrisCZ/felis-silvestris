<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	import Map from '$lib/map.svelte'
	import InfoRibbon from '$lib/info-ribbon.svelte'
	import MapInfo from '$lib/map-info.svelte'

	import Select, { Option } from '@smui/select';

	let overlays = [];

	let selectedOverlay = '';

	export let campaignId;

	let map;
	let clickLatLon;
	let pointInfo;

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
		overlays = map.overlays.map(o => o.name);
		selectedOverlay = overlays.length ? overlays[0] : '';
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
	<MapInfo bind:campaignId={campaignId} bind:point={clickLatLon} bind:pointInfo={pointInfo} />
		
	{#if overlays.length}
	<Select bind:value={selectedOverlay} slot="context-actions">
      {#each overlays as overlay}
        <Option value={overlay}>{overlay}</Option>
      {/each}
    </Select>
	{/if}
</InfoRibbon>
{#if pointInfo?.site}
	{#await goto('/' + campaignId + '/map/' + pointInfo.site.id)}
	{/await}
{/if}


