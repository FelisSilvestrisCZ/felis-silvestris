<script>
	import { page } from '$app/stores';
	import SiteDetail from '$lib/site-detail.svelte';

	export let campaignId = $page.params.campaignId;
	export let siteId = $page.params.siteId;

	$: siteId = $page.params.siteId;
</script>

<style>
	.site-detail-view {
	padding: 2em 2em 3em 2em;
	}
</style>

<div class="site-detail-view">
	{#key siteId}
		<SiteDetail bind:campaignId={campaignId} bind:siteId={siteId} />
	{/key}
</div>
