<script>
	import IntroSpinner from '$lib/intro-spinner.svelte'
	import VideoIntro from '$lib/video-intro.svelte'
	import ClassificationView from './classification-view.svelte'
	import CampaignRecordsView from '$lib/campaign-records-view.svelte'
	/*

	import MapView from './map-view.svelte'
	import Credits from './credits.svelte'
	import CatboxList from './catbox-list.svelte'
	import Chart from './animal-activity-chart.svelte'
	import ColorScale from './color-scale.svelte'
	*/
	let campaignId = null;
/*
	let fetchCampaignId = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign')
	await new Promise(r => setTimeout(r, 5000));
	return await response.json()
	})().then(r => campaignId = r[0].id);
	*/
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
	<!-- Material Icons -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<!-- Roboto -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<!-- Roboto Mono -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
	<!-- SMUI Styles -->
	<link rel="stylesheet" href="/smui.css" />
	<style>
		html, body {
		background-color: #D1F5FF;
		}
	</style>
</svelte:head>

<IntroSpinner />
<!--
{#await fetchCampaignId}

{:then}
	<CampaignRecordsView campaignId={campaignId} />

{:catch error}
	<p>An error occurred!</p>
{/await}
-->


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