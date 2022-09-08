<script>
	import { page } from '$app/stores';
	import UserLocation from '$lib/user-location.svelte'

	import CampaignMap from '$lib/campaign-map.svelte'
	import CampaignRecordsView from '$lib/campaign-records-view.svelte'
	import VideoIntro from '$lib/video-intro.svelte'
	import ResultsView from '$lib/results-view.svelte'
	import CampaignView from '$lib/campaign-view.svelte'

	import ClassificationView from '$lib/classification-view.svelte'

	let campaignId = $page.params.campaignId;
	let selectedView;
</script>

<div>
	<UserLocation bind:campaignId={campaignId} />

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
	