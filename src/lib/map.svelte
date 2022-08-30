<script>
	import { onMount } from 'svelte';

	export let map;
	export let onClick;

	import createMap from './create-map.js'

	function clickHandler(m, lat, lon) {
	if (onClick) onClick(m, lat, lon);
	};

	onMount(async () => {
	if (map) {
		createMap(map, (m, lat, lon) => {if (onClick) onClick(m, lat, lon)});
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

