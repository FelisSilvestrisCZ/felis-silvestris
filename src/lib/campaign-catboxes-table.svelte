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
			<th>description</th>
		</tr>
	</thead>
	<tbody>
	{#each campaign.catboxes as catbox}
		<tr>
		<td>{catbox.id}</td>
		<td>{catbox.name}</td>
		<td>{catbox.description}</td>	
		</tr>
	{/each}
	</tbody>
</table>


