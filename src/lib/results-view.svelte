<script>
	export let campaignId;

	import Divisor from '$lib/divisor.svelte'
	import RecordsByHourOfDayChart from '$lib/records-by-hour-of-day-chart.svelte';
	import RecordsByHourOfDayForSitesAndCatsChart from '$lib/records-by-hour-of-day-for-sites-and-cats-chart.svelte';


</script>

<style>
	.results-view {
		padding: 2em 3em;
	}
</style>

<div class="results-view">
	<RecordsByHourOfDayChart bind:campaignId={campaignId} />
	<Divisor />
	<RecordsByHourOfDayForSitesAndCatsChart bind:campaignId={campaignId} />
</div>