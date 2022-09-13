<script>
	import { onMount } from 'svelte';

	export let map;
	export let selectedOverlay;
	export let onClick;
	
	let mapElement;
	let mapa;
	

	import createMap from './create-map.js'

	function clickHandler(m, lat, lon) {
	if (onClick) onClick(m, lat, lon);
	};

	onMount(async () => {
	if (map) {
		mapa = createMap(mapElement, map, (m, lat, lon) => {if (onClick) onClick(m, lat, lon)});
	}
	});
	
	function selectOverlay(overlayName) {
		alert(overlayName);
	}
	
	
	//$: selectOverlay(selectedOverlay);
</script>

<style>
	.map {
	width: 100vw;
	height: 100vh;
	}
</style>

<div class="map" bind:this={mapElement}>&nbsp;</div>


