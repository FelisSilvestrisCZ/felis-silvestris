<script context="module">
	// Made by Kevin Åberg Kultalahti
	// Twitter: @kevmodrome
	// Don't miss Svelte Summit: https://sveltesummit.com

	import Map from './map.svelte'
	
	import fetchStore from './fetch.js'
	const [data, loading, error, get] = fetchStore("https://95.82.163.85:800/api/catbox")
</script>

<button on:click={get}>
	Fetch again
</button>
{#if $loading}
Loading: {$loading}
{:else if $error}
Error: {$error}
{:else}
{#each $data as catbox}
	<div>
		{catbox.name}
	</div>
{/each}
{/if}
