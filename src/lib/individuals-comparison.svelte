<script>
	import { ButtonGroup, Button } from 'svelte-mui';
	
	export let campaignId = null;

	let pairs = null;
	let record1;
	let record2;
	let source1;
	let source2;

	let fetchPairs = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/individual/pairs-for-comparison')
	return await response.json()
	})().then(r => {
		pairs = r; 
		record1 = pairs[0].record1; 
		record2 = pairs[0].record2; 
		source1 = "https://localhost:7097/api/record/" + record1.id + "/source"; 
		source2 = "https://localhost:7097/api/record/" + record2.id + "/source";
		}
	);

</script>

<style>
	video {
	display: inline-block;
	width: 49%;
	margin: 0;
	}
</style>

<div class="campaign-info">
	{#await fetchPairs}
	<p>...waiting</p>
	{:then}
<div>
	<video autoplay controls muted loop>
		<source src={source1} type="video/mp4"/>
	</video>
	<video autoplay controls muted loop>
		<source src={source2} type="video/mp4"/>
	</video>
<!--
	<ButtonGroup color="primary">
		<Button toggle outlined >Same</Button>
		<Button toggle outlined >Inconclusive</Button>
		<Button toggle outlined >Different</Button>
	</ButtonGroup>
-->
</div>
	{:catch error}
	<p>An error occurred!</p>
	{/await}
</div>
