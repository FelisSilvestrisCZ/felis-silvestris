<script>
	import VideoIntro from './video-intro.svelte'
	/*
	import ClassificationView from './classification-view.svelte'
	import MapView from './map-view.svelte'
	import Credits from './credits.svelte'
	import CatboxList from './catbox-list.svelte'
	import Chart from './animal-activity-chart.svelte'
	import ColorScale from './color-scale.svelte'
	*/
	let campaignId = null;
	let openApp = false;

	let fetchCampaignId = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign')
	return await response.json()
	})().then(r => campaignId = r[0].id);
</script>

	{#await fetchCampaignId}
		<p>...waiting</p>
	{:then}
		<VideoIntro bind:campaignId={campaignId} bind:openApp={openApp} />
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