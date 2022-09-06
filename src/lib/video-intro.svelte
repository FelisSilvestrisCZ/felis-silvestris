<script>
	import InfoRibbon from '$lib/info-ribbon.svelte'
	import CampaignInfo from '$lib/campaign-info.svelte'

	export let campaignId = null;

	let videosPlayed = Math.floor(Math.random() * 10000);
	let source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video/" + videosPlayed;
	let campaignUrl;
	let comparisonUrl;

	function handleEnded(e) {
		videosPlayed = Math.floor(Math.random() * 10000);
	}

	$: source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video/" + videosPlayed;
	$: campaignUrl = './campaign/' + campaignId;
	$: comparisonUrl = './comparison/' + campaignId;
</script>

<style>
	video {
	position: fixed;
	left: 0;
	top: 0;
	width: 100vw;
	max-width: 100vw;
	height: 100vh;
	object-fit: cover;
	z-index: -1;
	background-color: darkgray;
	overflow: hidden;
	}
</style>


	{#key source}
	<video autoplay controls on:ended={handleEnded} >
		<source src={source} type="video/mp4"/>
	</video>
	{/key}
	<InfoRibbon>
		<CampaignInfo bind:campaignId={campaignId} />
	</InfoRibbon>
