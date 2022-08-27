<script>
	import InfoRibbon from '$lib/info-ribbon.svelte'
	import CampaignInfo from '$lib/campaign-info.svelte'
	import MapIcon from "svelte-bootstrap-icons/lib/Map.svelte";
	import EyeIcon from "svelte-bootstrap-icons/lib/Eye.svelte";
	
	export let campaignId = null;

	let source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video";
	let videosPlayed = 0;
	let campaignUrl;
	let comparisonUrl;

	function handleEnded(e) {
	++videosPlayed;
	}

	$: source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video/" + videosPlayed;
	$: campaignUrl = './campaign/' + campaignId;
	$: comparisonUrl = './comparison/' + campaignId;
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
	display: inline-block;
	margin-left: 1em;
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
		<div slot="icons">
			<a href={comparisonUrl}>
				<EyeIcon width={48} height={48} />
			</a>
			<a href={campaignUrl}>
				<MapIcon width={48} height={48} />
			</a>	
		</div>
	</InfoRibbon>
</div>