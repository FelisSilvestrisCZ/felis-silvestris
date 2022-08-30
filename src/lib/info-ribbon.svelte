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
</style>

<div class="info-ribbon">
	<slot />
</div>
