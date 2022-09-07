<script>
	import IconButton from '@smui/icon-button';
	
	export let campaign;
</script>

<style>
	table {
	margin-top: 1em;
	}
	th {
	text-transform: uppercase;
	}
	td {
	font-size: 10px;
	}
	.heatmap {
	background: gray;
	}
</style>

<table>
	<thead>
		<tr>
			<th>id</th>
			<th>name</th>
			<th>location</th>
			<th>description</th>
			<th>actions</th>
		</tr>
	</thead>
	<tbody>
	{#each campaign.sites as site}
		<tr>
		<td>{site.id}</td>
		<td>{site.name}</td>
		<td>{site.latitude}E {site.longitude}N</td>
		<td>{site.description}</td>
		<td>
			<IconButton href="./{campaign.id}/site/{site.id}" class="material-icons" size="16">
				forward
			</IconButton>
			<img class="heatmap" src={'https://95.82.163.85:800/api/campaign/' + campaign.id + '/site/' + site.id + '/heatmap'} />
		</td>
		</tr>
	{/each}
	</tbody>
</table>


