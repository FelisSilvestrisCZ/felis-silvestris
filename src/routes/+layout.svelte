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
		font-family: 'Kanit';
		font-weight: 300;
		--mdc-typography-subtitle1-font-weight: 300;
		--mdc-typography-font-family: 'Kanit';
		--mdc-theme-primary: #d1f5ff;
		--mdc-theme-surface: #92abb2;
		--mdc-theme-on-surface: #d1f5ff;
		--mdc-shape-medium: 0;
		scrollbar-gutter: stable;
		}

		.mdc-menu {
		position: absolute;
		width: auto;
		}

		.smui-select--standard .mdc-select__dropdown-icon {
		margin: 0;
		}

		.mdc-menu .mdc-deprecated-list {
		color: #d1f5ff;
		white-space: nowrap;
		}

		.mdc-deprecated-list-item {
		height: auto;
		max-width: auto;
		line-height: 2em;
		}

		.mdc-select:not(.mdc-select--disabled) .mdc-select__dropdown-icon {
		fill: #d1f5ff;
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

		.mdc-select__anchor {
		width: auto;
		}

		.smui-select--standard .mdc-select__anchor {
		height: auto;
		display: inline-block;
		}

		.mdc-select:not(.mdc-select--disabled) .mdc-select__selected-text {
		color: inherit;
		}

		.mdc-line-ripple {
		display: none;
		}

		/* Fix of rounding error in mapy.cz API client */
		.smap img {
		zoom: 1.005;
		border: 0;
		margin: 0;
		padding: 0;
		}

		.map-pin {
		position: absolute;
		top: 40%;
		left: 20%;

		border-radius: 50%;
		border: 8px solid #fff;
		width: 8px;
		height: 8px;
		}

		.map-pin::after {
		position: absolute;
		content: '';
		width: 0px;
		height: 0px;
		bottom: -30px;
		left: -6px;
		border: 10px solid transparent;
		border-top: 17px solid #fff;
		}

		.map-pin div {
		position: absolute;
		bottom: 1.5em;
		left: 6px;
		transform: translatex(-50%);
		color: white;
		font-family: sans-serif;
		}

		.mapshot.smap .hud, .smap .copyright {
		display: none;
		}

		.smap .scale {
		text-shadow: 1px 0px 1px #1f2526;
		color: #d1f5ff;
		font-family: 'Kanit';
		}

		.smap .scale .parts {
		border: none;
		}

		.smap .scale .parts span.even {
		border-color: #d1f5ff;
		}

		.smap .scale .parts span.odd {
		border-color: #1f2526;
		}

		.smap .scale .unit {
		top: 10px;
		}
	</style>
</svelte:head>

<slot></slot>

