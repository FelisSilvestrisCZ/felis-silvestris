<script>
	import { onMount } from 'svelte';
	import createSimpleMap from '$lib/create-simple-map.js'

	let mapshotsToResolve = null;
	let currentMapshot = 0;

	var fetchMapshotsToResolve = (async () => {
		var response = await fetch('https://localhost:800/api/mapshot/');
		return await response.json();
	})().then(r => mapshotsToResolve = r);


	let mapElement;
	let mapa;

	async function createMap(e)  {
	if (mapshotsToResolve) {
	var mapshot = mapshotsToResolve[currentMapshot];	
	mapa = createSimpleMap(e, mapshot.latitude, mapshot.longitude, mapshot.baseMap, mapshot.mapZoomLevel);
	}
	};

	import html2canvas from 'html2canvas';

	let dataUrl = null;

	function handleCapture() {
		html2canvas(document.querySelector("#capture"), {allowTaint: true}).
		then(function(canvas) {
					//document.body.appendChild(canvas);
					dataUrl = canvas.toDataURL();
					});
	}; 

	async function postToServer(d) {
		await fetch('https://localhost:800/api/mapshot/', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({mapshot: mapshotsToResolve[currentMapshot], data: d}),
		});
		await new Promise(r => setTimeout(r, 5000));
		if (currentMapshot < mapshotsToResolve.length - 1)
		{
			currentMapshot = currentMapshot + 1;
		}
	};

	$: if (dataUrl) postToServer(dataUrl);
	$: createMap(mapElement);

</script>

<style>
	.mapshot {
		width: 512px;
		height: 512px;
		margin: 2em;
	}
</style>

{#await fetchMapshotsToResolve}
Loading...
{:then}
	{#key currentMapshot}
	{currentMapshot+1}/{mapshotsToResolve.length}
	<div id="capture" class="mapshot" bind:this={mapElement}></div>
	{/key}
	<a on:click={e => handleCapture()}>Take screenshot</a>
{/await}



