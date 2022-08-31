<script>
	import Chart from '$lib/value-by-hour-of-day-chart.svelte';

	export let campaignId;
</script>

<h2>Records of cats by hour of day and site</h2>
<Chart bind:campaignId={campaignId} urlSuffix="records-by-hour-of-day-for-sites-and-cats">
	<p>The graph shows the number of cat records taken at each hour of the day by observation site. It is of technical interest only and should not be used directly as a graph of activity versus time of day.</p>
</Chart>


