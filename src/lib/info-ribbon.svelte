<script>
</script>

<style>
	.info-ribbon {
		position: fixed;
		right: 0;
		top: 0;
		background: #92abb2;
		padding: 6em 2em 2em 2em;
		z-index: 1;
		color: #d1f5ff;
		min-width: 16.5em;
		justify-content: center;
		display: flex;
	}

	.info-ribbon table.values {
		border-spacing: 0 0.5em;
		border-collapse: separate;
	}
</style>

<div class="info-ribbon">
	<div class="content">
		<table class="values">
			<slot />
		</table>
	</div>
</div>
