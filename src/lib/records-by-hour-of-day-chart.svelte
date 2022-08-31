<script>
	import Chart from '$lib/value-by-hour-of-day-chart.svelte';

	export let campaignId;
</script>


<h2>Records by hour of day</h2>
<Chart bind:campaignId={campaignId} urlSuffix="records-by-hour-of-day">
	<p>The graph shows the number of records taken at each hour of the day by animal. It is only of technical interest and should not be used directly as a graph of activity versus time of day.</p>
</Chart>

