<script>
	import { page } from '$app/stores';

	export let campaignId = $page.params.campaignId;
</script>	
	
<style>
	a {
	padding: 2em;
	display: block;
	}
</style>

<a href="/{campaignId}/map">Select some site from the map</a>