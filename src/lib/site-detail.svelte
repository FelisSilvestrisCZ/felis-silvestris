<script>
	import SiteHeatmap from '$lib/site-heatmap.svelte';
	
	export let campaignId;
	export let siteId;

	let siteDetail;
	
	let fetchSiteDetail = (async () => {
	const response = await fetch('https://localhost:800/api/campaign/' + campaignId + '/site/' + siteId + '/detail')
	return await response.json()
	})().then(r => siteDetail = r);
</script>

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

