<script>
</script>

<style>
	td.label {
	font-size: 10px;
	padding-right: 10px;
	border-right: 0.5px dotted;
	text-align: right;
	}

	td.value {
	padding-left: 10px;
	}

</style>

<tr>
	<td class="label">
		<slot name="label"></slot>
	</td>
	<td class="value">
		<slot name="value"></slot>
	</td>
</tr>
