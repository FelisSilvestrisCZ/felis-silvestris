<script>
	import { page } from '$app/stores';
	import CampaignMap from '$lib/campaign-map.svelte'

	let campaignId = $page.params.campaignId;
	let selectedSite;
</script>

<CampaignMap campaignId={campaignId} bind:selectedSite={selectedSite} />

<slot></slot>
