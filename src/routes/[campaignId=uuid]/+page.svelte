<script>
	import { page } from '$app/stores';

	import ViewSwitch from '$lib/view-switch.svelte'
	import CampaignMap from '$lib/campaign-map.svelte'
	import CampaignRecordsView from '$lib/campaign-records-view.svelte'
	import VideoIntro from '$lib/video-intro.svelte'
	import ResultsView from '$lib/results-view.svelte'
	import CampaignView from '$lib/campaign-view.svelte'

	import ClassificationView from '$lib/classification-view.svelte'

	let campaignId = $page.params.campaignId;
	let selectedView;
</script>

<svelte:head>
	<!-- Mapy.CZ API -->
	<script src="https://api.mapy.cz/loader.js"></script>
	<script>Loader.load()</script>
	<!-- bootstrap -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
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

<div>
	<ViewSwitch bind:selectedView={selectedView} />
	{#if selectedView && selectedView.name == 'movies'}
		<VideoIntro bind:campaignId={campaignId} />
	{:else if selectedView && selectedView.name == 'map'}
		<CampaignMap campaignId={campaignId} />
	{:else if selectedView && selectedView.name == 'campaign'}
		<CampaignView campaignId={campaignId} />
	{:else if selectedView && selectedView.name == 'results'}
		<ResultsView campaignId={campaignId} />
	{:else if selectedView && selectedView.name == 'records'}
		<CampaignRecordsView campaignId={campaignId} />
	{/if}
</div>
	