<script>
	import DataTable, {
	Head,
	Body,
	Row,
	Cell,
	Label,
	SortValue,
	} from '@smui/data-table';
	import IconButton from '@smui/icon-button';

	export let campaignId = null;

	let records = null;

	let fetchCampaignRecords = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/record')
	return await response.json()
	})().then(r => records = r.records);
</script>

<style>

</style>

<div class="campaign-info">
	{#await fetchCampaignRecords}
	<p>...waiting</p>
	{:then}
	Fetched {records.length} records.
	{:catch error}
	<p>An error occurred!</p>
	{/await}
</div>