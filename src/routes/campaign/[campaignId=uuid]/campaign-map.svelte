<script>
	import Map from './map.svelte'
	import InfoRibbon from '$lib/info-ribbon.svelte'
	import MapInfo from '$lib/map-info.svelte'
	import FilmIcon from "svelte-bootstrap-icons/lib/Film.svelte";

	export let campaignId;

	let map = null;

	let fetchMap = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/map')
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
<Map map={map} />
{:catch error}
<p>An error occurred!</p>
{/await}
	<InfoRibbon>
		<MapInfo bind:campaignId={campaignId} />
		<a slot="icons" href="../..">
			<FilmIcon width={48} height={48} />
		</a>
	</InfoRibbon>


