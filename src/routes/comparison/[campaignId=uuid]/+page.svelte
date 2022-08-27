<script>
	import { page } from '$app/stores';
	import IndividualsComparison from '$lib/individuals-comparison.svelte'

	let campaignId = $page.params.campaignId;
</script>

<IndividualsComparison campaignId={campaignId} />

<!--
<Chart />
<ClassificationView />

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