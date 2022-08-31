<script>
	export let campaignId;
	
	import AnimalActivityChart from '$lib/animal-activity-chart.svelte';


</script>

<style>
	.results-view {
		padding: 2em 3em;
	}
</style>

<div class="results-view">
<AnimalActivityChart bind:campaignId={campaignId} />
</div>