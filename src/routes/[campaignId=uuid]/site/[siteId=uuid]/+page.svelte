<script>
	import { page } from '$app/stores';
	import SiteDetail from '$lib/site-detail.svelte';

	export let campaignId = $page.params.campaignId;
	export let siteId = $page.params.siteId;

	$: siteId = $page.params.siteId;
</script>

{#key siteId}
<SiteDetail bind:campaignId={campaignId} bind:siteId={siteId} />
{/key}

