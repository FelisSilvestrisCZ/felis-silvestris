<script>
	import { page } from '$app/stores';
	import ViewSwitch from '$lib/view-switch.svelte'

	let campaignId = $page.params.campaignId;
</script>

<ViewSwitch bind:campaignId={campaignId} />
<slot></slot>

