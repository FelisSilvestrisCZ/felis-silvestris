<script>
	export let hue = 0;
	
	let colors = [""];

	function createColors() {
		var newColors = [""];
		for (let score = 0.0; score <= 1.0; score = score + 0.25) {

		var h = hue;
		var s = Math.round(100.0 * score);
		var l = Math.round(score * 90.0);
		newColors.push("" + h + " " + s + "% " + l + "%");
		}
	colors = newColors;
	}

	createColors();
</script>

<style>
	.color {
	width: 80px; height: 80px; display: inline-block; margin: 0.5em;
	}
</style>

<div style="opacity: 1;">
{#each colors as color}
	<div class="color" style="background-color: hsl({color});">

	</div>
	{/each}
</div>

