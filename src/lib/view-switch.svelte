<script>
	import SegmentedButton, { Segment } from '@smui/segmented-button';
	import Button from '@smui/button';
	import { Label } from '@smui/common';

	let choices = ['Morning', 'Afternoon', 'Evening', 'Night'];
	let selected = 'Morning';
</script>

<style>

</style>

<SegmentedButton segments={choices} let:segment singleSelect bind:selected>
  <!-- Note: the `segment` property is required! -->
  <Segment {segment}>
    <Label>{segment}</Label>
  </Segment>
</SegmentedButton>


