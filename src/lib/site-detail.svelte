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

<img src={'https://95.82.163.85:800/api/campaign/' + campaignId + '/site/' + siteId + '/heatmap'} width="100%"/>

{#await fetchSiteDetail}
<p>...waiting</p>
{:then}
<h1>Site {siteDetail.site.name} </h1>
<table>
	<thead>
		<tr>	
			<th>Id</th>
		</tr>
	</thead>
	<tbody>
		{#each siteDetail.records as record}
		<tr>
			<td>{record.id}</td>
			<td>{record.dateTime}</td>
			<td>{record.contentType}</td>
			<td>
				{#each record.tags as tag}
					<span class="tag">#{tag}</span>
				{/each}
			</td>
		</tr>
		{/each}
	</tbody>
</table>
{:catch error}
<p>An error occurred!</p>
{/await}


<SiteMap campaignId={campaignId} siteId={siteId} />