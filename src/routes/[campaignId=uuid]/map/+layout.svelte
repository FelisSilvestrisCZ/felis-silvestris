<script>
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import CampaignMap from '$lib/campaign-map.svelte'
	
	let campaignId = $page.params.campaignId;
	let selectedSite;
</script>

<CampaignMap campaignId={campaignId} bind:selectedSite={selectedSite} />

{#await goto('/' + campaignId + '/map' + (selectedSite ? '/' + selectedSite.id : ''))}
{/await}
<slot></slot>
