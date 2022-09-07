<script>
	import { goto } from '$app/navigation';

	import IntroSpinner from '$lib/intro-spinner.svelte'

	let campaignId = null;

</script>

<svelte:head>
	<!-- Mapy.CZ API -->
	<script src="https://api.mapy.cz/loader.js"></script>
	<script>
		var loaded;
		if (!loaded) {
			Loader.load();
			loaded = true;
		}
	</script>
	<!-- bootstrap -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
	<!-- Material Icons -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<!-- Roboto -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<!-- Roboto Mono -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
	<!-- SMUI Styles -->
	<link rel="stylesheet" href="/smui.css" />
	<style>
		html, body {
		background-color: #D1F5FF;
		}
	</style>
</svelte:head>

{#if !campaignId}
	<IntroSpinner bind:campaignId={campaignId} />
{:else}
	{#await goto('/' + campaignId)}
	{/await}
{/if}

