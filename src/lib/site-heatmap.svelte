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
	let selectedDay = null;
	let selectedDayElement = null;
	
	function toggleDaySelection(e, day) {
		if (selectedDay === day) {
			selectedDayElement.classList.remove("selected");
			selectedDayElement = selectedDay = null;
		} else {
			if (selectedDayElement) {
				selectedDayElement.classList.remove("selected");
			}
			selectedDayElement = e.currentTarget;
			selectedDayElement.classList.add("selected");
			selectedDay = day;
		}
	}
</script>

<style>
	table.run-table {
	width: 100%;
	text-align: left;
	table-layout: fixed;
	border-collapse: collapse;
	margin: 0.5em 0;
	color: #92abb2;
	}

	tr {
	margin: 0.25em;
	}

	td {
	position: relative;
	text-align: left;
	padding: 1em 0 0 0;
	}

	.selected, .day-detail {
	color: #1f2526;
	}

	.day-detail {
	padding: 1em 0;
	}

	td.outside {
	color: transparent;
	}

	td.in-progress {
	background: lightpink;
	}

	td.separator {
	text-align: center;
	}

	.record.selected {
	border: 2px solid yellow;
	z-index: 5;
	}

	.record {
	width: 1em;
	height: 1em;
	background: darkgray;
	border-radius: 2em;
	box-shadow: 1px 1px 1.5px #1f2526;
	}

	td a.record, td div.event {
	position: absolute;
	bottom: -0.15em;
	left: 50%;
	z-index: 2;
	transform: translate(-50%, -50%);
	}

	td div.event {
	z-index: unset;
	}

	div.event {
	width: 1em;
	height: 1em;
	border-radius: 50%;
	opacity: 30%;
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

	.record.other	 {
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
		top: 0;
		white-space: nowrap;
		font-size: 12px;
		z-index: 1;
		background-color: #b2d0d9;
		min-width: 100%;
		padding-right: 2em;
	}

	.legend {
	margin-bottom: 2em;
	}

	.legend .record, .legend .event {
	display: inline-block;
	margin-right: 0.5em;
	}

	div.day-detail {
	white-space: nowrap;
	overflow-x: scroll;
	overflow-y: hidden;
	padding: 0;
	}

	div.hour {
	white-space: nowrap;
	min-width: 5em;
	padding-left: 0.25em;
	display: inline-block;
	text-align: left;
	}

	.day-detail-event {
	display: inline-block;
	border-left: 0.5px dotted #d1f5ff;
	padding: 0 0.25em;
	position: relative;
	}

	.dummy-event {
	height: 25em;
	width: 3em;
	margin-bottom: 0.5em;
	}

	.day-detail-event .record {
	position: absolute;
	left: 1em;
	top: 1em;
	}

	.day-detail-event video {
	height: 25em;
	box-shadow: 1px 1px 5px #1f2526;
	border: 1px solid #d1f5ff;
	display: block;
	margin-bottom: 0.5em;
	}
</style>

<div class="legend">
		<div class="record cat"/>cat
		<div class="record mouse" />mouse
		<div class="record fox" />fox
		<div class="record hedgehog" />hedgehog
		<div class="record bird" />bird
		<div class="record other" />other
		<div class="record no-animal" />none
		<div class="event sunrise"/>sunrise
		<div class="event sunset"/>sunset
</div>
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
			<tr on:click={e => toggleDaySelection(e, day)}>
				{#each day.hours as hour}
				<td class={getHourClasses(hour)}>
					{#if hour.runId}
						{hour.hour}
					{:else}
						&nbsp;
					{/if}
					{#if hour.temperatureInCelsius}
						<div class="observation-date">{Math.round(hour.temperatureInCelsius * 10.0)/10.0}°C</div>
					{/if}
					{#if hour.isFirstHourOfRun}
					<div class="observation-date">{siteDetail.runs.find(r => r.id == hour.runId).name} {siteDetail.runs.find(r => r.id == hour.runId).catboxName}</div>
					{/if}
					{#if !hour.hour}
					<div class="observation-date">{day.date.substring(0, day.date.indexOf('T'))}</div>
					{/if}
					{#each hour.events as event}
					{#if event.eventType == "record"}
					<a class={getRecordClasses(event.data)} style="left: {event.positionInHour * 100}%;" on:click={(e) => selectRecord(e, event.data)} title={event.data}></a>
					{:else}
					<div class="event {event.eventType}" style="left: {event.positionInHour * 100}%;"></div>
					{/if}
					{/each}
				</td>
				{/each}
			</tr>
			{#if selectedDay === day}
			<tr>
				<td class="day-detail" colspan="24">
					<div class="day-detail">
						{#each day.hours as hour}
							<div class="hour">
								<div class="day-detail-event">
									<div class="dummy-event" />
									{hour.hour}:00
								</div>
								{#each hour.events as event}
									<div class="day-detail-event">
										{#if event.eventType == "record"}
										<div class={getRecordClasses(event.data)}></div>
										<video controls style="left: {event.positionInHour * 100}%;">
											<source src={"https://localhost:800/api/record/" + event.data + "/source"} type="video/mp4" />
										</video>
										{event.time.substring(event.time.indexOf('T') + 1).substring(0, 5).replace(/^0+/, '')}
										{:else}
										<!--<div class="event {event.eventType}" style="left: {event.positionInHour * 100}%;"></div>-->
										{/if}
									</div>
								{/each}
							</div>
						{/each}
					</div>
				</td>
			</tr>
			{/if}
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

