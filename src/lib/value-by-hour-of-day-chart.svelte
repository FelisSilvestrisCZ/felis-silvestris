<script>
	import Chart from 'svelte-frappe-charts';

	export let campaignId;
	export let urlSuffix;
	
	let activities;
	let chartData;

	const fetchData = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/' + urlSuffix)
	return await response.json()
	});

	let fp = fetchData().then(r => activities = r);
	
	function activitiesToChartData(a) {
		if (!a) return null;
		var data = {
			labels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
			datasets: []
		}
		for (var animalName in a) {
			if (a [animalName].totalRecords == 0) continue;
			var dataset = {
				name: animalName,
				values: a[animalName].recordsByHourOfDay/*.map(h => h / a[animalName].totalRecords * 24.0 * 100)*/
			};
			data.datasets.push(dataset);
		}
		return data;
	}
	
	$: chartData = activitiesToChartData(activities);
</script>

{#await fp}
<p>...waiting</p>
{:then}
	<Chart data={chartData} type="line" height="400"/>
	<slot />
{:catch error}
<p>An error occurred!</p>
{/await}
