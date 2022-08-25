<script>
	import { onMount } from 'svelte';

	export let data;
	
	import createMap from './create-map.js'
	
	onMount(async () => {
	if (data) {
	createMap(data);
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

