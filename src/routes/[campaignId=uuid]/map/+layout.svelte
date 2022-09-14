<script>
	import { page } from '$app/stores';
	import CampaignMap from '$lib/campaign-map.svelte'
	import FelisSilvestris from '$lib/fs-logo.svelte'

	let campaignId = $page.params.campaignId;
	let selectedSite;

	$: selectedSite = $page.params.siteId;
</script>

<FelisSilvestris />

<CampaignMap campaignId={campaignId} bind:selectedSite={selectedSite} />

<slot></slot>
