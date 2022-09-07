<script>
	import SiteMap from '$lib/site-map.svelte';
	
	export let campaignId;
	export let siteId;

	let siteDetail;
	
	let fetchSiteDetail = (async () => {
	const response = await fetch('https://95.82.163.85:800/api/campaign/' + campaignId + '/site/' + siteId + '/detail')
	return await response.json()
	})().then(r => siteDetail = r);
</script>

<style>

</style>

{#await fetchSiteDetail}
<p>...waiting</p>
{:then}
<h1>Site {siteDetail.site.name}</h1>
{:catch error}
<p>An error occurred!</p>

{/await}

<SiteMap campaignId={campaignId} siteId={siteId} />