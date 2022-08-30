<script>
	import LinearProgress from '@smui/linear-progress';
	
	export let campaignId;

	let fetchCampaignId = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign')
	await new Promise(r => setTimeout(r, 5000));
	return await response.json()
	})().then(r => campaignId = r[0].id);
</script>

<style>
	.intro {
	max-width: 500px;
	margin: 3em auto;
	text-align: center;	
	}
	img {
		max-width: 200px;
	}
</style>
<div class="intro">
	<img src="/fs-logo-transparent.png" />
	<h1>Felis Silvestris</h1>
	<h2>Wild cat to countryside</h2>
	<p>Felis silvestris, the wild cat, is a project aimed at reintroducing this species into the Czech countryside. The cat has been a part of the Czech landscape for centuries, and is still present today. <br />
	Read more at <a href="https://felissilvestris.cz">felissilvestris.cz</a>.</p>
	{#await fetchCampaignId}
		<p>Connecting to application...</p>
		<LinearProgress indeterminate />
	{:then}
		Done
	{:catch error}
		<p>Cannot connect to application.</p>
	{/await}
</div>