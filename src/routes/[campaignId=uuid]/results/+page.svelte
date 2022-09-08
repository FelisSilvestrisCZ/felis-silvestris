<script>
	import { page } from '$app/stores';
	import ResultsView from '$lib/results-view.svelte'
	let campaignId = $page.params.campaignId;
</script>

<ResultsView campaignId={campaignId} />
	