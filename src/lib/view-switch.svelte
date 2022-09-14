<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	import SegmentedButton, {
	Segment,
	Icon,
	Label,
	} from '@smui/segmented-button';

	export let campaignId;

	const views = [
	{
	name: 'movies',
	icon: 'local_movies',
	},
	{
	name: 'map',
	icon: 'map',
	},
	{
	name: 'site',
	icon: 'place',
	},
	{
	name: 'results',
	icon: 'bar_chart',
	},
	];

	let selectedView = views[0];

	function selectViewFromPage() {
		var viewName = $page.routeId.substring($page.routeId.indexOf('/') + 1);
		viewName = viewName.indexOf('/') ? viewName.substring(0, viewName.indexOf('/')) : viewName;
		selectedView = views.find(v => v.name == viewName);
	}

	$: selectViewFromPage($page);
</script>

<style>
	.view-switch {
	position: fixed;
	z-index: 20;
	top: 2em;
	right: 2em;
	background-color: transparent;
	border-radius: 0px;
	--mdc-segmented-button-unselected-container-fill-color: rgba(0, 0, 0, 0.5);
	}
</style>
<div class="view-switch"> 
	<SegmentedButton style="display: block;"
    segments={views}
    let:segment
    singleSelect
    bind:selected={selectedView}
    key={(segment) => segment.name}>
    <Segment {segment} title={segment.name} on:click={goto('/' + campaignId + '/' + segment.name + ($page.params.siteId ? ('/' + $page.params.siteId) : ''))} >
		<Icon class="material-icons" height="auto">
			{segment.icon}
		</Icon>
    </Segment>
  </SegmentedButton>
</div>




