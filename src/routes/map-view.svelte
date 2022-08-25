<script context="module">
	// Made by Kevin Åberg Kultalahti
	// Twitter: @kevmodrome
	// Don't miss Svelte Summit: https://sveltesummit.com

	import Map from './map.svelte'
	
	import fetchStore from './fetch.js'
	const [data, loading, error, get] = fetchStore("https://localhost:7097/api/map")
</script>

<button on:click={get}>
	Fetch again
</button>
{#if $loading}
Loading: {$loading}
{:else if $error}
Error: {$error}
{:else}
	<Map data={$data} />
{/if}
