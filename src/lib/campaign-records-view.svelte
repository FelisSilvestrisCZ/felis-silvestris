<script>
	import DataTable, { Pagination, Label } from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import Select, { Option } from '@smui/select';

	export let campaignId = null;
	let fetchCampaignRecords = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/record')
	return await response.json()
	})().then(r => campaignRecords = r);
	
	function formatDatetime(dt) {
		return dt.substring(0, dt.indexOf('+')).replace('T', ' ');
	}

	$: items = campaignRecords ? campaignRecords.records.filter(r => r.animals && r.animals.cat && r.contentType.startsWith('video/')) : [];

	let campaignRecords = null;
	let items = [];
	let slice = [];
	let rowsPerPage = 10;
	let currentPage = 0;

	$: start = currentPage * rowsPerPage;
	$: end = Math.min(start + rowsPerPage, items.length);
	$: slice = items.slice(start, end);
	$: lastPage = Math.max(Math.ceil(items.length / rowsPerPage) - 1, 0);

	$: if (currentPage > lastPage) {
	currentPage = lastPage;
	}


</script>

<style>
	.record {
	position: relative;
	width: 30vw;
	margin: 1em;
	display: inline-block;
	background-color: black;
	}
	.record-info {
	//position: absolute;
	background-color: rgba(0, 0, 0, 1);
	padding: 0 1em 0.75em 1em;
	font-weigth: bold;
	color: skyblue;
	text-transform: uppercase;
	width: 100%;
	text-align: center;
	z-index: 1;
	}
	video {
	display: block;
	width: 100%;
	}
</style>


	{#await fetchCampaignRecords}
	<p>...waiting</p>
	{:then}
	
    {#each slice as item (item.id)}
			<div class="record">
			<video controls>
				<source src={'https://localhost:7097/api/record/' + item.id + '/source'} />
			</video>
				<div class="record-info">{item.siteName} {formatDatetime(item.dateTime)}</div>
			</div>
    {/each}

  <Pagination style="position: sticky; bottom: 0; background-color: white; overflow: visible; z-index: 2;">
    <svelte:fragment slot="rowsPerPage">
      <Label>Rows Per Page</Label>
      <Select variant="outlined" bind:value={rowsPerPage} noLabel>
        <Option value={10}>10</Option>
        <Option value={25}>25</Option>
        <Option value={100}>100</Option>
      </Select>
    </svelte:fragment>
    <svelte:fragment slot="total">
      {start + 1}-{end} of {items.length}
    </svelte:fragment>
 
    <IconButton
      class="material-icons"
      action="first-page"
      title="First page"
      on:click={() => (currentPage = 0)}
      disabled={currentPage === 0}>first_page</IconButton
    >
    <IconButton
      class="material-icons"
      action="prev-page"
      title="Prev page"
      on:click={() => currentPage--}
      disabled={currentPage === 0}>chevron_left</IconButton
    >
    <IconButton
      class="material-icons"
      action="next-page"
      title="Next page"
      on:click={() => currentPage++}
      disabled={currentPage === lastPage}>chevron_right</IconButton
    >
    <IconButton
      class="material-icons"
      action="last-page"
      title="Last page"
      on:click={() => (currentPage = lastPage)}
      disabled={currentPage === lastPage}>last_page</IconButton
    >
  </Pagination>

	
	{:catch error}
	<p>An error occurred!</p>
	{/await}
