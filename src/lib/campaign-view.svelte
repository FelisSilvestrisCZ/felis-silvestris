<script>
	import Tab, { Label } from '@smui/tab';
	import TabBar from '@smui/tab-bar';
	import Button from '@smui/button';
	
	export let campaignId;
	
	let campaign;
	let active = 'Runs';

	let fetchDefinition = (async () => {
	const response = await fetch('https://localhost:7097/api/campaign/' + campaignId + '/definition')
	return await response.json()
	})().then(r => campaign = r);
</script>

<style>
	.campaign-view {
		padding: 2em;
	}
	a {
	color: skyblue;
	}
	table {
		margin-top: 1em;
	}
	th {
		text-transform: uppercase;
	}
	td {
	font-size: 10px;
	}
</style>

{#await fetchDefinition}
<p>...waiting</p>
{:then}
	<div class="campaign-view">
		<h1>{campaign.name}</h1>
		  <TabBar tabs={['Runs', 'Sites', 'Catboxes']} let:tab bind:active>
		<!-- Note: the `tab` property is required! -->
		<Tab {tab}>
		  <Label>{tab}</Label>
		</Tab>
	  </TabBar>
		{#if active='Runs'}
		<table>
			<thead>
				<tr>
					<th>id</th>
					<th>name</th>
					<th>site</th>
					<th>catbox</th>
					<th>from</th>
					<th>to</th>
					<th>note</th>
				</tr>
			</thead>
			<tbody>
			{#each campaign.runs as run}
				<tr>
				<td>{run.id}</td>
				<td>{run.name}</td>
				<td>{run.site.name}</td>
				<td>{run.catbox.name}</td>
				<td>{run.from}</td>
				<td>{#if run.isInProgress}In progress{:else}{run.to}{/if}</td>
				<td>{run.note}</td>	
				</tr>
			{/each}
			</tbody>
		</table>
		{/if}
	</div>
{:catch error}
<p>An error occurred!</p>
{/await}


