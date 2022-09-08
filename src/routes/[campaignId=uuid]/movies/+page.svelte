<script>
	import { page } from '$app/stores';
	import VideoIntro from '$lib/video-intro.svelte'

	let campaignId = $page.params.campaignId;
</script>

	<VideoIntro bind:campaignId={campaignId} />
	