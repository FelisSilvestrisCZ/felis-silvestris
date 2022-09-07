<script>
	import { page } from '$app/stores';
	import SiteDetail from '$lib/site-detail.svelte';

	let campaignId = $page.params.campaignId;
	let siteId = $page.params.siteId;
</script>

<SiteDetail campaignId={campaignId} siteId={siteId} />

