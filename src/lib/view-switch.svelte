<script>
	import SegmentedButton, {
	Segment,
	Icon,
	Label,
	} from '@smui/segmented-button';

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
	name: 'campaign',
	icon: 'list',
	},
	{
	name: 'results',
	icon: 'bar_chart',
	},
	{
	name: 'records',
	icon: 'camera',
	},
	];

	export let selectedView = views[0];
</script>

<style>

</style>
<div style="position: fixed; z-index: 10; top: 2em; right: 2em; background-color: rgba(0,0,0, 0.5); border-radius: 6px; --mdc-segmented-button-unselected-container-fill-color: rgba(0, 0, 0, 0.5);"> 
<SegmentedButton style="display: block;"
    segments={views}
    let:segment
    singleSelect
    bind:selected={selectedView}
    key={(segment) => segment.name}
  >
    <Segment {segment} title={segment.name}>
		<Icon class="material-icons" height="auto" style="color: skyblue;">
			{segment.icon}
		</Icon>
    </Segment>
  </SegmentedButton>
</div>



