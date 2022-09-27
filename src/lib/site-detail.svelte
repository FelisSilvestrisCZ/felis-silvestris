<script>
	import createSimpleMap from '$lib/create-simple-map.js'
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import SiteHeatmap from '$lib/site-heatmap.svelte';
	import SiteRecords from '$lib/site-records.svelte';
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

	let mapElement;
	let mapa;

	async function createMap(e)  {
		if (siteDetail)	mapa = createSimpleMap(e, siteDetail.site.latitude, siteDetail.site.longitude, 3, 17);
	};

	$: createMap(mapElement);
	
	let active = "Heat map";
</script>

<style>
	.color {
		color: black;
		margin: 0.5em;
		padding: 1em;
	}
	
	.map {
		float: right;
		width: 256px;
		height: 256px;
		margin-left: 2em;
		margin-bottom: 2em;
	}
	.content {
		margin-top: 2em;
	}
</style>

{#await fetchSiteDetail}
<p>...waiting</p>
{:then}
<div class="site-detail">
	<div class="map" bind:this={mapElement}></div>
	<h1>
		Site {siteDetail.site.name} <small>{Math.round(siteDetail.differenceToAverageTemperature * 100)/100}°C {Math.round(siteDetail.siteElevation)} m</small>
	</h1>
	<p>{siteDetail.site.description}</p>
	<TabBar tabs={['Heat map', 'Runs and records']} let:tab bind:active>
		<!-- Note: the `tab` property is required! -->
		<Tab {tab}>
		  <Label>{tab}</Label>
		</Tab>
	</TabBar>
</div>
<div class="content">
	{#if active == 'Heat map'}
		<SiteHeatmap siteDetail={siteDetail} />
	{:else if active == 'Runs and records'}
		<SiteRecords siteDetail={siteDetail} />
	{/if}
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
