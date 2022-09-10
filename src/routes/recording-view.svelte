<script>
	import AnimalsClassification from './animals-classification.svelte'

	export let recording = {
	LocationName: "loc0",
	Date: "2022-07-13 0:57:30",
	Url: "https://localhost:800/api/record/f0e1deed-a0d3-9e12-eff3-ac024a2d064c",
	MimeType: "video/mp4"
	}
</script>

<style>
	video {
	max-width: 800px;
	margin-bottom: 1em;
	}
</style>

<video controls preload="metadata">
	<source src={recording.Url} type={recording.MimeType} />
</video>
<h1>{recording.LocationName} {recording.Date}</h1>
<AnimalsClassification id="f0e1deed-a0d3-9e12-eff3-ac024a2d064c" />
