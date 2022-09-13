<script>
	import IconButton from '@smui/icon-button';

	export let siteDetail;

	let selectedRecord = null;
	let selectedRecordElement = null;

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
	
	let recordSource;

	function selectRecord(e, record) {
		if (selectedRecordElement) {
			selectedRecordElement.classList.remove('selected');
		}
		recordSource = "https://localhost:800/api/record/" + record.id + "/source";
		selectedRecord = record;
		selectedRecordElement = e.target;
		selectedRecordElement.classList.add('selected');
		previewOpen = true;
	}
	
	let previewOpen = false;
</script>

<style>
	table.run-table {
	width: 100%;
	text-align: left;
	table-layout: fixed;
	border-collapse: collapse;
	margin: 0.5em 0;
	}

	thead {
	margin: 0.25em 0;
	}

	th, td {
	color: #92abb2;
	position: relative;
	//border-bottom: 0.5px dotted;
	text-align: left;
	padding: 1.2em 0 0.8em 0;
	}

	th {
	color: #1f2526;
	border-bottom: 0.5px solid;
	padding: 0;
	}

	th.name {
	text-transform: uppercase;
	}

	th.note, th.id {
	font-weight: normal;
	}

	td {
	position: relative;
	}

	td.outside {
	color: transparent;
	}

	td.in-progress {
	background: lightpink;
	}

	a.selected {
	border: 2px solid yellow;
	z-index: 5;
	}

	a.record {
	display: block;
	width: 20%;
	height: 90%;
	background: darkgray;
	position: absolute;
	bottom: 0;
	left: 50%;
	//opacity: 0.8;
	z-index: 1;
	border-radius: 2em;
	box-shadow: 0.5px 0.5px 1.5px #1f2526;
	}

	.record.cat {
	background: #B2D0D9;
	}

	.record.fox {
	background: #D9B2D0;
	}

	.record.mouse {
	background: #BBB2D9;
	}

	.record.hedgehog {
	background: #D9BBB2;
	}

	.record.bird {
	background: #D0D9B2
	}

	.record.other-animal {
	background: #B2D9BB;
	}

	.record.no-animal {
	background: #92abb2;
	}

	.context-bar {
	position: fixed;
	bottom: 2em;
	right: 2em;
	height: 50vh;
	z-index: 1;
	//opacity: 0.7;
	}

	.context-bar .preview {
	width: auto;
	height: 100%;
	}

	.context-bar .actions {
	text-align: right;
	position: absolute;
	top: 0;
	right: 0;
	color: #d1f5ff;
	z-index: 2;
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
					<a class={getRecordClasses(record)} style="left: {record.positionInHour * 100}%;" on:click={(e) => selectRecord(e, record)}>
						
					</a>
					{/each}
				</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>
{/each}

{#if selectedRecord && previewOpen}
<div class="context-bar">
	{#key recordSource}

		<div class="actions"><IconButton class="material-icons" title="Close" on:click={e => previewOpen = false}>close</IconButton></div>
		{#if selectedRecord.contentType.startsWith('video/')}
		<video class="preview" autoplay controls>
			<source src={recordSource} type={selectedRecord.contentType} />
		</video>
		{:else}
		<img class ="preview" src={recordSource} />
		{/if}

	{/key}
</div>
{/if}

