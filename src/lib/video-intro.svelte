<script>
	import InfoRibbon from '$lib/info-ribbon.svelte'
	import CampaignInfo from '$lib/campaign-info.svelte'
	import MapIcon from "svelte-bootstrap-icons/lib/Map.svelte";

	export let campaignId = null;

	let source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video";
	let videosPlayed = 0;
	let campaignUrl;

	function handleEnded(e) {
	++videosPlayed;
	}

	$: source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video/" + videosPlayed;
	$: campaignUrl = './campaign/' + campaignId;
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

	a {
	color: skyblue;
	}
</style>

<div class="intro">
	{#key source}
	<video autoplay muted on:ended={handleEnded} >
		<source src={source} type="video/mp4"/>
	</video>
	{/key}
	<InfoRibbon>
		<CampaignInfo bind:campaignId={campaignId} />
		<a slot="icons" href={campaignUrl}>
			<MapIcon width={48} height={48} />
		</a>
	</InfoRibbon>
</div>