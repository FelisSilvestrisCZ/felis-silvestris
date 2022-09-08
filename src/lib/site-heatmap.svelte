<script>
	export let siteDetail;
	
	const hours = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]

	function days(run) {
		var from = new Date(run.from);
		var to = run.isInProgress ? new Date(Date.now()) : new Date(run.to);
		from.setHours(0, 0, 0, 0);
		to.setHours(0, 0, 0, 0);
		var days = [];
		for (let day = from; day <= to; day = new Date(day.getTime()+86400000)) {
			days.push(day);
		};
		return days;
	}
	
	function getHourClasses(run, day, hour) {
		var dt = new Date(day.getTime() + 86400000 / 24 * hour);
		var from = new Date(run.from);
		var to = run.isInProgress ? new Date(Date.now()) : new Date(run.to);
		if (dt < from) return "outside before";
		if (dt >= to) return "outside after";
		if (run.isInProgress) return "inside in-progress";
		return "inside";
	}
	
	function getRecords(run, day, hour) {
		var runFrom = new Date(run.from);
		var runTo = run.isInProgress ? new Date(Date.now()) : new Date(run.to);
		var dayFrom = new Date(day.getTime() + 86400000 / 24 * hour);
		var dayTo =  new Date(day.getTime() + 86400000 / 24 * (hour + 1));
		var from = runFrom > dayFrom ? runFrom : dayFrom;
		var to = runTo < dayTo ? runTo : dayTo;
		return siteDetail.records
			.filter(r => new Date(r.dateTime) >= from && new Date(r.dateTime) < to)
			.map(r => {
				r.positionInHour = (new Date(r.dateTime) - from) / 86400000 * 24;
				return r;
				});
	}
	
	function getRecordClasses(record) {
		var classes = "record";
		record.tags.forEach (tag => classes += ' ' + tag);	
		return classes;	
	}
</script>

<style>
	table.run-table {
	width: 100%;
	text-align: left;
	table-layout: fixed;
	font-family: 'Roboto', sans-serif;
	//font-size: 10px;
	border-collapse: collapse;
	margin: 0.5em 0;
	}
	
	thead {
		margin: 0.25em 0;
	}

	th, td {
		margin: 0;
		padding: 0.25em 0.5em;
		border: 0;
		vertical-align: top;
	}
	th {
		padding:0.5em;
	}
	
	th.name {
		text-transform: uppercase;
	}
	
	th.note, th.id {
		font-weight: normal;
	}
	
	td {
	color: #d0d0d0;
	border: 0.5px dotted #d0d0d0;
	//border-right: 1px solid #d0d0d0;
	position: relative;
	}

	td.outside {
		color: transparent;
	}
	
	td.in-progress {
	background: lightpink;
	}

	.record {
	width: 33%;
	height: 100%;
	background: darkgray;
	position: absolute;
	top: 0;
	left: 50%;
	opacity: 0.8;
	z-index: 2;
	}

	.record.cat {
	background: skyblue;
	}

	.record.fox {
	background: red;
	}

	.record.mouse {
	background: brown;
	}

	.record.hedgehog {
	background: green;
	}

	.record.bird {
	background: orange;
	}

	.record.other-animal {
	background: magenta;
	}

	.record.no-animal {
	background: darkgray;
	}

</style>

{#each siteDetail.runs as run}
<table class="run-table">
	<thead>
		<tr>
			<th colspan="2">{run.from.substring(0, run.from.indexOf('T'))}</th>
			<th class="name" colspan="3">{run.name}/{run.catboxName}</th>
			<th class="note" colspan="19">{run.note}</th>
		</tr>
		<!--
		<tr>
			{#each hours as hour}
			<th>{hour}</th>
			{/each}
		</tr>
		-->
	</thead>
	<tbody>
		{#each days(run) as day}
			<tr>
				{#each hours as hour}
				<td class={getHourClasses(run, day, hour)}>
					{hour}
					{#each getRecords(run, day, hour) as record}
					<div class={getRecordClasses(record)} style="left: {record.positionInHour * 100}%;">
						
					</div>
					{/each}
				</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
{/each}


