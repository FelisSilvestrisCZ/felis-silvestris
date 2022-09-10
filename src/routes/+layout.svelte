<svelte:head>
	<!-- Mapy.CZ API -->
	<script src="https://api.mapy.cz/loader.js"></script>
	<script>
		var loaded;
		if (!loaded) {
		Loader.load();
		loaded = true;
		}
	</script>
	<!-- bootstrap -->
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap.min.css" />
	<!-- Material Icons -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
	<!-- Roboto -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700" />
	<!-- Roboto Mono -->
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto+Mono" />
	<!-- SMUI Styles -->
	<link rel="stylesheet" href="/smui.css" />
	
	<style>
		html, body {
		background-color: #b2d0d9;
		color: #1f2526;
		border: 0;
		margin: 0;
		padding: 0;
		/*font-family: 'Kanit';*/
		/*font-weight: 300;*/
		}

		.mdc-segmented-button__segment {
		border: 0;
		background: transparent;
		color: #d1f5ff;
		border-radius: 0 !important;
		}

		.mdc-segmented-button__icon {
		font-size: 24px;
		}

		.mdc-segmented-button__segment--selected {
		border-bottom: 0.25em solid !important;
		}
	</style>
</svelte:head>

<slot></slot>

