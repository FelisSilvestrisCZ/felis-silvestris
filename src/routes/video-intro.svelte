<script>
	import CampaignInfo from './campaign-info.svelte'
	
	export let campaignId = null;

	let source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video";
	let videosPlayed = 0;

	function handleEnded(e) {
	++videosPlayed;
	}

	$: source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video/" + videosPlayed;
</script>

<style>
	.intro {
	position: absolute;
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

<div class="intro">
	{#key source}
	<video autoplay muted on:ended={handleEnded} >
		<source src={source} type="video/mp4"/>
	</video>
	{/key}
	<CampaignInfo bind:campaignId={campaignId} />
</div>