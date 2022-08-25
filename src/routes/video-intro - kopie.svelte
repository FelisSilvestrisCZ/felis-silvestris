<script>
	export let campaignId = null;

	let source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video";
	let videosPlayed = 0;

	function handleEnded(e) {
	++videosPlayed;
	}

	$: source = "https://localhost:7097/api/campaign/" + campaignId + "/intro-video/" + videosPlayed;
</script>

<style>
	video {
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	object-fit: cover;
	background-color: darkgray;
	}
	.title-frame {
	position: absolute;
	left: 0;
	bottom: 0;
	background-color: black;
	width: 100vw;
	color: white;
	background: rgb(0,0,0);
	background: linear-gradient(4deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%);	}
</style>

{#key source}
<video autoplay muted on:ended={handleEnded} >
	<source src={source} type="video/mp4"/>
</video>
{/key}
<div class="title-frame">
	<h1>Observation campaign: </h1>
	<h2>From:</h2>
	<h2>Status: </h2>
</div>
