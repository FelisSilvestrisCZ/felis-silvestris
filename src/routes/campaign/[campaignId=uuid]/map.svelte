<script>
	import { onMount } from 'svelte';

	export let map;
	
	import createMap from './create-map.js'
		
	function clickHandler(m, lat, lon) {
		console.log(lat + ' ' + lon);
	}
	
	onMount(async () => {
	if (map) {
	createMap(map, clickHandler);
	}
	});
</script>

<style>
	#mapa {
	width: 100vw;
	height: 100vh;
	}
</style>

<div id="mapa">&nbsp;</div>

