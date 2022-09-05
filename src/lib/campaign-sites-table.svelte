<script>
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
</style>

<table>
	<thead>
		<tr>
			<th>id</th>
			<th>name</th>
			<th>note</th>
		</tr>
	</thead>
	<tbody>
	{#each campaign.sites as site}
		<tr>
		<td>{site.id}</td>
		<td>{site.name}</td>
		<td>{site.description}</td>	
		</tr>
	{/each}
	</tbody>
</table>


