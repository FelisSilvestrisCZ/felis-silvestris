<script>
	import SiteHeatmap from '$lib/site-heatmap.svelte';
	import InfoRibbon from '$lib/info-ribbon.svelte'
	
	export let campaignId;
	export let siteId;

	let siteDetail;
	
	let fetchSiteDetail = (async () => {
	const response = await fetch('https://localhost:800/api/campaign/' + campaignId + '/site/' + siteId + '/detail')
	return await response.json()
	})().then(r => siteDetail = r);
	
	let colors = [
	{animal: 'cat', color: 'd1f4ff'},
	{animal: 'mouse', color: 'fcffd1'},
	{animal: 'fox', color: 'ffd4d1'},
	{animal: 'hedgehog', color: 'd1ffd4'},
	{animal: 'bird', color: 'dcd1ff'},
	{animal: 'other', color: 'ffd1f4'}];
</script>

<style>
	.color {
		color: black;
		margin: 0.5em;
		padding: 1em;
	}
</style>

{#await fetchSiteDetail}
<p>...waiting</p>
{:then}
<div class="site-detail">
	<h1>Site {siteDetail.site.name}</h1>
	<p>{siteDetail.site.description}</p>
	<SiteHeatmap siteDetail={siteDetail} />
</div>
{:catch error}
<p>An error occurred!</p>
{/await}

<!--
<InfoRibbon>
			{#each colors as color}
			<div class="color" style="background: #{color.color};">
				{color.animal}
			</div>
		{/each}
</InfoRibbon>
-->
