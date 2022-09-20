<script>
	let fetchElevations = (async () => {
	const response = await fetch('https://localhost:800/api/elevation')
	var elevations = await response.json();
	await resolveElevations(elevations);
	})();
	
	async function resolveElevations(elevations) {
		for(const item of elevations) {
			var coords = SMap.Coords.fromWGS84(item.longitude, item.latitude);
			await coords.getAltitude().then(e => {
				item.elevation = e;
				console.log(item.latitude + ' ' + item.longitude + ' ' + item.elevation);
				});
			};
		console.log('Posting elevations');
		console.log(JSON.stringify(elevations));
		await fetch('https://localhost:800/api/elevation', {
			method: 'POST',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(elevations)
			});
	};
</script>

{#await fetchElevations}
{:then}
	Elevations resolved OK
{/await}