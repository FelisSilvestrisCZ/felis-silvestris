<script>
	import { page } from '$app/stores';

	export let campaignId = $page.params.campaignId;
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css">
	<script src="https://api.mapy.cz/loader.js"></script>
	<script>Loader.load()</script>
</svelte:head>

{campaignId}


<!--
<Chart />
<ClassificationView />
<MapView />
<ColorScale />
<ColorScale hue={120} />
<ColorScale hue={240} />
-->
<!--
<div>
<CatboxList />
<Credits />
</div>
-->