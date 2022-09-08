<script>
	import CampaignMap from '$lib/campaign-map.svelte';
	import SiteHeatmap from '$lib/site-heatmap.svelte';
	
	export let campaignId;
	export let siteId;

	let siteDetail;
	
	let fetchSiteDetail = (async () => {
	const response = await fetch('https://95.82.163.85:800/api/campaign/' + campaignId + '/site/' + siteId + '/detail')
	return await response.json()
	})().then(r => siteDetail = r);
</script>

<style>
	.site-detail {
		padding: 2em;
		background: #D1F5FF;
		width: 70vw;
	}
	.toolbar {
		position: fixed;
		right: 0;
		top: 0;
		max-width: 30vw;
		z-index:10;
	}
</style>

<div class="toolbar">
	<CampaignMap campaignId={campaignId} />
</div>

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

