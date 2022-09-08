<script>
	import { page } from '$app/stores';
	import CampaignMap from '$lib/campaign-map.svelte'
	let campaignId = $page.params.campaignId;
</script>

<CampaignMap campaignId={campaignId} />

