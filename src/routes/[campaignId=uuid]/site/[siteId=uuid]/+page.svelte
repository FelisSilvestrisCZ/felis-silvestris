<script>
	import { page } from '$app/stores';
	import SiteDetail from '$lib/site-detail.svelte';

	export let campaignId = $page.params.campaignId;
	export let siteId = $page.params.siteId;
</script>

{siteId}
<SiteDetail bind:campaignId={campaignId} bind:siteId={siteId} />

