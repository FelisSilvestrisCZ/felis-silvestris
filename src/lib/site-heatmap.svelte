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
	
	function getRecordClasses(recordId) {
		var classes = "record";
		var record = siteDetail.records.find(r => r.id == recordId);
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
    padding: 0.5em 0 0 0;
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
    width: 1em;
    height: 1em;
    background: darkgray;
    position: absolute;
    bottom: 4px;
	left: 50%;
	z-index: 1;
	border-radius: 2em;
	box-shadow: 0.5px 0.5px 1.5px #1f2526;
	transform: translatex(-50%);
	}
	
	div.event {
		width: 1em;
		height: 1em;
		position: absolute;
		bottom: 4px;
		left: 50%;
		border-radius: 50%;
		opacity: 30%;
		transform: translatex(-50%);
	}
	
	div.event.sunset {
		background: midnightblue;
	}
	
	div.event.sunrise {
		background: yellow;
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
    top: -4px;
    white-space: nowrap;
    font-size: 12px;
	}
	
	div.record {
		color: #1f2526;
		padding: 0.25em 0.5em;
		margin: 0 0.5em;
		border-radius: 2em;
		box-shadow: 0.5px 0.5px 1.5px #1f2526;
	}
	
	div.record .event {
		display: inline-block;
		position: relative;
		top: 0.25em;
		left: 0;
		margin-right: 0.5em;
		border: 0;
		box-shadow: 0;
	}
	.legend {
		margin-bottom: 2em;
	}
</style>

<table class="legend">
	<tr>
		<td><div class="record cat">cat</div></td>
		<td><div class="record mouse">mouse</div></td>
		<td><div class="record fox">fox</div></td>
		<td><div class="record hedgehog">hedgehog</div></td>
		<td><div class="record bird">bird</div></td>
		<td><div class="record other">other</div></td>
		<td><div class="record no-animal">none</div></td>
		<td><div class="record"><div class="event sunrise"></div>sunrise</div></td>
		<td><div class="record"><div class="event sunset"></div>sunset</div></td>
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
					{#each hour.events as event}
					{#if event.eventType == "record"}
					<a class={getRecordClasses(event.data)} style="left: {event.positionInHour * 100}%;" on:click={(e) => selectRecord(e, event.data)}></a>
					{:else}
					<div class="event {event.eventType}" style="left: {event.positionInHour * 100}%;"></div>
					{/if}
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

