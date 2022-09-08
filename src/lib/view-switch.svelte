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
</script>

<style>
	.view-switch {
	position: fixed; z-index: 20; top: 2em; right: 2em; background-color: rgba(0,0,0, 0.5); border-radius: 6px; --mdc-segmented-button-unselected-container-fill-color: rgba(0, 0, 0, 0.5);	
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
		<Icon class="material-icons" height="auto" style="color: skyblue;">
			{segment.icon}
		</Icon>
    </Segment>
  </SegmentedButton>
</div>




