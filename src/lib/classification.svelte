<script>
	import AnimalsClassification from './animals-classification.svelte'

	export let recordId = null;

	let record = null;

	let sourceUrl = null;

	$: sourceUrl = 'https://localhost:800/api/record/' + recordId + '/source';
	$: reload(recordId);

	async function fetchRecord() {
	const response = await fetch('https://localhost:800/api/record/' + recordId);
	return await response.json();
	};

	let fp = fetchRecord().then(r => record = r);

	function reload(newId) {
	fp = fetchRecord().then(r => record = r)
	}
</script>

<style>
	video, .video, img {
	height: 70vh;
	max-height: 70vh;
	width: auto;
	margin-bottom: 1em;
	}
</style>



<div class="video">
{#await fp}
<video controls autoplay preload="metadata"></video>
{:then}
	{#if record.contentType.startsWith('image')}
	<img src={sourceUrl} />
	{:else if record.contentType.startsWith('video')}
	<video controls autoplay preload="metadata">
		<source src={sourceUrl} type={record.contentType} />
	</video>
	{:else}
	<p>Content type {record.contentType} not supported.</p>
	{/if}

{:catch error}
<p>An error occurred!</p>
{/await}
</div>
<AnimalsClassification recordId={recordId} />


