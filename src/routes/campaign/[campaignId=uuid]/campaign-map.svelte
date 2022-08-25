<script>
	import Map from './map.svelte'

	export let campaignId;

	let map = null;

	let fetchMap = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/map')
	return await response.json()
	})().then(r => map = r);
</script>

{#await fetchMap}
<p>...waiting</p>
{:then}
<Map map={map} />
{:catch error}
<p>An error occurred!</p>
{/await}


