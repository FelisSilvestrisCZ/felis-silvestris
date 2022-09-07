<script>
	import VideoIntro from './video-intro.svelte'
	import ClassificationView from './classification-view.svelte'
	import MapView from './map-view.svelte'
	import Credits from './credits.svelte'
	import CatboxList from './catbox-list.svelte'
	import Chart from './animal-activity-chart.svelte'
	import ColorScale from './color-scale.svelte'

	let campaignId = null;

	let fetchCampaignId = (async () => {
	const response = await fetch('https://95.82.163.85:800/api/campaign')
	return await response.json()
	})().then(r => campaignId = r[0].id);
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
	<script src="https://api.mapy.cz/loader.js"></script>
	<script>Loader.load()</script>
</svelte:head>

	{#await fetchCampaignId}
		<p>...waiting</p>
	{:then}
		<VideoIntro bind:campaignId={campaignId} />
	{:catch error}
		<p>An error occurred!</p>
	{/await}


<!--
<Chart />
<ClassificationView />
<MapView />
<ColorScale />
<ColorScale hue={120} />
<ColorScale hue={240} />
-->
<!--
<div>
<CatboxList />
<Credits />
</div>
-->