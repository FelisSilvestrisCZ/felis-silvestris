<script>
	import IconButton from '@smui/icon-button';

	export let siteDetail;

</script>

<style>
	table.record-table {
	text-align: left;
	table-layout: fixed;
	border-collapse: collapse;
	margin: 0.5em 0;
	}
	
	tr {
	margin: 0.25em;
	}

	td {
	position: relative;
	text-align: left;
	padding: 0 1em;
	}
</style>

<table class="record-table">
	<tbody>
		{#each siteDetail.records as record}
			<tr>
				<td>
					{record.dateTime.substring(0, record.dateTime.indexOf('T'))}
				</td>
				<td>
					{record.dateTime.substring(record.dateTime.indexOf('T') + 1, record.dateTime.indexOf('+'))}
				</td>
				<td>
					{record.tags}
				</td>
				<td>
					{#if record.timestamp && record.isTimestampTemperatureValid}
					{record.timestamp.celsiusTemperature}°C
					{/if}
				</td>
			</tr>
		{/each}
	</tbody>
</table>



