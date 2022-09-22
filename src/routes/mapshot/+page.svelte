<script>

		import { onMount } from 'svelte';
	import createSimpleMap from '$lib/create-simple-map.js'

			let mapElement;
	let mapa;

		onMount(async () => {
		mapa = createSimpleMap(mapElement);
	});



</script>

<style>
	.mapshot {
		width: 256px;
		height: 256px;
		margin: 2em;
	}
</style>
<div class="mapshot" bind:this={mapElement}>&nbsp;</div>
