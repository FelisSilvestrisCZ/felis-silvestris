<script>
	import { onMount } from 'svelte';

	export let map;
	
	import createMap from './create-map.js'
	
	onMount(async () => {
	if (map) {
	createMap(map);
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

