<script>
	import Arrow from "svelte-bootstrap-icons/lib/ArrowRightCircleFill.svelte";
	export let campaignId = null;

	let info = null;

	let fetchCampaignInfo = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId)
	return await response.json()
	})().then(r => info = r);
</script>

<style>
	.campaign-info {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100vw;
	max-width: 100vw;
	background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
	overflow: hidden;
	padding: 3em 3em;
	text-transform: uppercase;
	}

	.campaign-info {
	color: lightgray;
	}

	label, a {
	color: skyblue;
	font-weight: 500;
	margin: 0 0.5em;
	}

	label:first-sibling {
	margin-left: 0;
	}

	a {
	display: block;
	position: absolute;
	right: 3em;
	top: 50%;
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
	}
</style>

<div class="campaign-info">
	{#await fetchCampaignInfo}
	<p>...waiting</p>
	{:then}
	<a href="./campaign/{campaignId}">
		<Arrow width={48} height={48} />
	</a>
	<label>Campaign</label> {info.campaignName}
	<label>Start</label> {info.from}
	<label>Status</label> In progress
	{:catch error}
	<p>An error occurred!</p>
	{/await}
</div>
