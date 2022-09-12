<script>
	import InfoRibbon from '$lib/info-ribbon.svelte'
	import CampaignInfo from '$lib/campaign-info.svelte'
	import IconButton from '@smui/icon-button';

	export let campaignId = null;

	let videosPlayed = Math.floor(Math.random() * 10000);
	let source = "https://localhost:800/api/campaign/" + campaignId + "/intro-video/" + videosPlayed;
	let fp = fetchIntroRecord().then(r => introRecord = r);
	let introRecord;

	async function fetchIntroRecord() {
	const response = await fetch(source);
	return await response.json();
	};

	function handleEnded(e) {
		videosPlayed = Math.floor(Math.random() * 10000);
		source = "https://localhost:800/api/campaign/" + campaignId + "/intro-video/" + videosPlayed;
		fp = fetchIntroRecord().then(r => introRecord = r);
	}
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

{#await fp}
{:then}
	<video autoplay controls on:ended={handleEnded} >
		<source src={'https://localhost:800/api/record/' + introRecord.id + '/source'} type={introRecord.contentType} />
	</video>
{/await}

<InfoRibbon>
	<CampaignInfo bind:campaignId={campaignId} bind:record={introRecord} />
	<div slot="context-actions">
		<IconButton on:click={() => handleEnded()} class="material-icons">arrow_forward</IconButton>
	</div>
</InfoRibbon>
