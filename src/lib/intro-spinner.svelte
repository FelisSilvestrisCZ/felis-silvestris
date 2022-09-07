<script>
	import LinearProgress from '@smui/linear-progress';
	import IconButton from '@smui/icon-button';

	export let campaignId;
	let fetchedId;

	let fetchCampaignId = (async () => {
	const response = await fetch('https://95.82.163.85:800/api/campaign')
	return await response.json()
	})().then(r => fetchedId = r[0].id);
</script>

<style>
	.intro {
	text-align: center;
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100vh;
	max-width: 600px;
	margin: 0 auto;
	}
	img {
	max-width: 200px;
	margin: 1em;
	}
</style>
<div class="intro">
	<div style="margin: 0 2em">
	<img src="/fs-logo-transparent.png" />
	<h1>Felis Silvestris</h1>
	<h2>Wild cat to countryside</h2>
	<p>Felis silvestris, the wild cat, is a project aimed at reintroducing this species into the Czech countryside. The cat has been a part of the Czech landscape for centuries, and is still present today.</p>
	{#await fetchCampaignId}
		<p>Connecting to application&hellip;</p>
		<LinearProgress indeterminate />
	{:then}
		<IconButton on:click={() => campaignId = fetchedId} class="material-icons">arrow_forward</IconButton>
	{:catch error}
		<p>Cannot connect to application.</p>
		{/await}
	</div>
</div>