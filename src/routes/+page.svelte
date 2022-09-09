<script>
	import { goto } from '$app/navigation';

	import IntroSpinner from '$lib/intro-spinner.svelte'

	let campaignId = null;

</script>

{#if !campaignId}
	<IntroSpinner bind:campaignId={campaignId} />
{:else}
	{#await goto('/' + campaignId + '/movies')}
	{/await}
{/if}

