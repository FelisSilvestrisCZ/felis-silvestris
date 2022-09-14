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
	
	function getHourClasses(hour) {
		var classes = hour.runId ? "in-run" : "out-run";
		if (hour.isFirstHourOfRun) classes += " first";
		if (hour.isLastHourOfRun) classes += " last";
		if (hour.isRunInProgress) classes += " in-progress";
		return classes;
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
	
	function getRecordClasses(recordInHour) {
		var classes = "record";
		var record = siteDetail.records.find(r => r.id == recordInHour.recordId);
		record.tags.forEach (tag => classes += ' ' + tag);	
		return classes;	
	}
	
	let recordSource;

	function selectRecord(e, recordId) {
		if (selectedRecordElement) {
			selectedRecordElement.classList.remove('selected');
		}
		var record = siteDetail.records.find(r => r.id = recordId);
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

	td {
	color: #92abb2;
	position: relative;
	text-align: left;
	padding: 2em 0 0 0;
	position: relative;
	}
	
	td.outside {
	color: transparent;
	}

	td.in-progress {
	background: lightpink;
	}
	
	td.separator {
	text-align: center;
	text-decoration: underline;
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
	z-index: 1;
	border-radius: 2em;
	box-shadow: 0.5px 0.5px 1.5px #1f2526;
	}

	.record.cat {
	background: #d1f5ff;
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
	
	.observation-date {
		position: absolute;
		left: 0;
		top: 1em;
		white-space: nowrap;
		font-size: 12px;
	}
	
	div.record {
		color: #1f2526;
		padding: 0.5em 1em;
	}
</style>

<table>
	<tr>
		<td><div class="record cat">cat</div></td>
		<td><div class="record mouse">mouse</div></td>
		<td><div class="record fox">fox</div></td>
		<td><div class="record hedgehog">hedgehog</div></td>
		<td><div class="record bird">bird</div></td>
		<td><div class="record other">other</div></td>
		<td><div class="record no-animal">none</div></td>	
	</tr>
</table>
<table class="run-table">
	<tbody>
		{#each siteDetail.observationDays as day}
			{#if day.daysAfterLastRun > 1}
			<tr>
				<td class="separator" colspan="24">
					{day.daysAfterLastRun} day(s) without observation
				</td>
			</tr>
			{/if}
			<tr>
				{#each day.hours as hour}
				<td class={getHourClasses(hour)}>
					{#if hour.runId}
						{hour.hour}
					{:else}
						&nbsp;
					{/if}
					{#if !hour.hour}
						<div class="observation-date">{day.date.substring(0, day.date.indexOf('T'))}</div>
					{/if}
					{#if hour.isFirstHourOfRun}
						<div class="observation-date" style="color: #1f2526;">{siteDetail.runs.find(r => r.id == hour.runId).name} {siteDetail.runs.find(r => r.id == hour.runId).catboxName}</div>
					{/if}
					{#each hour.records as record}
					<a class={getRecordClasses(record)} style="left: {record.positionInHour * 100}%;" on:click={(e) => selectRecord(e, record.recordId)}>
						
					</a>
					{/each}
				</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

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

