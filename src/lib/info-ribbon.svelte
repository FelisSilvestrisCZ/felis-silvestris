<script>
</script>

<style>
	.info-ribbon {
	position: absolute;
	left: 0;
	bottom: 0;
	width: 100vw;
	max-width: 100vw;
	background: linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 100%);
	overflow: hidden;
	padding: 3em 3em;
	text-transform: uppercase;
	color: skyblue;
	z-index: 1;
	}

	.icons-slot {
	display: block;
	position: absolute;
	right: 3em;
	top: 50%;
	-ms-transform: translateY(-50%);
	transform: translateY(-50%);
	}
</style>

<div class="info-ribbon">
	<slot />
	<div class="icons-slot">
		<slot name="icons" />
	</div>
</div>
