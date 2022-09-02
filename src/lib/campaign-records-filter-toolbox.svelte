<script>
	import Textfield from '@smui/textfield';

	export let filter = (i) => true;

	let focused = false;
	let value = null;
	let dirty = false;
	let invalid = false;
	$: disabled = focused || !value || !dirty || invalid;
</script>

<style>
	.toolbox {
	position: absolute;
	background-color: rgba(0, 0, 0, 0.9);
	border-radius: 4px;
	right: 2em;
	top: 6em;
	z-index: 1;
	padding: 1em;
	color: skyblue;
	--mdc-theme-primary: skyblue;
	}
</style>


<div class="toolbox">
	  <Textfield
    type="email"
    bind:dirty
    bind:invalid
    updateInvalid
    bind:value
    label="Search"
    style="min-width: 150px; border-bottom-color: skyblue;"
    input$autocomplete="email"
    withTrailingIcon={false}
  />
</div>
