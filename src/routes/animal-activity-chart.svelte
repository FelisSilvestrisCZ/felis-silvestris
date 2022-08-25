<script>
	import Chart from 'svelte-frappe-charts';

	let data = null;

	const fetchData = (async () => {
	const response = await fetch('https://localhost:7097/api/chart/activity')
	return await response.json()
	});

	let fp = fetchData().then(r => data = r);
</script>

{#await fp}
<p>...waiting</p>
{:then}
<Chart data={data} type="line" height="500" title="Count of records per hour"/>
{:catch error}
<p>An error occurred!</p>
{/await}
