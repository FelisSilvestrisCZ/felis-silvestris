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


