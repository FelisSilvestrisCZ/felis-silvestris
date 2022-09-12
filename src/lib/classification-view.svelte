<script>
	import { ButtonGroup, Button } from 'svelte-mui';
	import Classification from './classification.svelte'

	let records = null;
	let currentIndex = 0;
	let currentRecordId = null;
$:	currentRecordId = records ? records[currentIndex] : null;

	const fetchRecords = (async () => {
	const response = await fetch('https://localhost:800/api/animals/not-classified')
	return await response.json()
	});

	let fp = fetchRecords().then(function(r) {
	currentIndex = 0;
	records = r;}
	);
	
	function onPrevious() {
		if (currentIndex > 0) currentIndex--;
	}
	
	function onNext() {
		if (currentIndex < (records.length - 1)) currentIndex++;
	}
	
	function rescan() {
		fetch('https://localhost:800/api/record/rescan', {method: 'POST'})
			.then(r => fp = fetchRecords().then(r => {
				currentIndex = 0;
				records = r;}
			)); 
	}
	
</script>

<style>
	h4 {
	text-transform: uppercase;
	font-family: sans-serif;
	}

	.classification-view {
	text-align: center;
	margin: 2em;
	}
	
	.nav-buttons {
		margin: 1em;
	}
</style>
<div class="classification-view">
{#await fp}
<p>...waiting</p>
{:then}

	{#if records.length}
	<h4>
	{currentIndex + 1}/{records.length} {currentRecordId}
	</h4>
	{:else}
	<h4>
		No unclassified records now
	</h4>
	<p>
		<a on:click={rescan}>Rescan for new records</a>
	</p>
	{/if}
<Classification recordId={currentRecordId} />
<ButtonGroup class="nav-buttons" unelevated color="primary">
    <Button unelevated on:click={onPrevious}>Previous</Button>
    <Button unelevated on:click={onNext}>Next</Button>
</ButtonGroup>
{:catch error}
<p>An error occurred!</p>
{/await}
</div>


