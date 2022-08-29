<script>
	import DataTable, {
	Head,
	Body,
	Row,
	Cell,
	Label,
	SortValue,
	Pagination
	} from '@smui/data-table';
	import IconButton from '@smui/icon-button';
	import Select, { Option } from '@smui/select';

	export let campaignId = null;
	let fetchCampaignRecords = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/record')
	return await response.json()
	})().then(r => campaignRecords = r);

	$: items = campaignRecords ? campaignRecords.records : [];

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
	}
	.record-info {
		position: absolute;
		background-color: rgba(50, 50, 50, 0.5);
		padding: 1em;
		font-weigth: bold;
		color: skyblue;
		text-transform: uppercase;
		width: 100%;
		text-align: center;
	}
	video {
	    width: 50vw;
		display: block;
	}
</style>

<div class="campaign-info">
	{#await fetchCampaignRecords}
	<p>...waiting</p>
	{:then}
	
<DataTable table$aria-label="Records">
  <Body>
    {#each slice as item (item.id)}
      <Row>
        <Cell>
			<div class="record">
			<div class="record-info">{item.siteName} {item.dateTime}</div>
			<video controls>
				<source src={'https://localhost:7097/api/record/' + item.id + '/source'} />
			</video>
			</div>
		</Cell>
      </Row>
    {/each}
  </Body>
 
  <Pagination slot="paginate" style="position: sticky; bottom: 0; background-color: white;">
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
</DataTable>	
	
	{:catch error}
	<p>An error occurred!</p>
	{/await}
</div>