<script>
	import { ButtonGroup, Button } from 'svelte-mui';

	export let recordId = null;
	$: reload(recordId);

	let animals = null;

	const fetchAnimals = (async () => {
	const response = await fetch('https://95.82.163.85:800/api/animals/' + recordId)
	return await response.json()
	});

	let fp = fetchAnimals().then(r => animals = r);

	function reload(newRecordId) {
	fp = fetchAnimals().then(r => animals = r);
	}

	async function postAnimals () {
	const res = await fetch('https://95.82.163.85:800/api/animals/' + recordId, {
	method: 'POST',
	headers: {
	'Content-Type': 'application/json'
	},
	body: JSON.stringify(animals)});
	console.log('post ' + recordId);
	}

	function onNoAnimal() {
	if (animals.noAnimal) {
	animals.cat = animals.mouse = animals.hedgehog = animals.bird = animals.fox = animals.otherAnimal = false;
	};
	postAnimals();
	}

	function onAnimal() {
	if (!animals.cat && !animals.mouse && !animals.hedgehog && !animals.bird && !animals.fox && !animals.otherAnimal) {
           animals.noAnimal = true;
        };
		postAnimals();
    }
</script>

{#await fp}
<p>...waiting</p>
{:then}
<ButtonGroup color="primary">
    <Button toggle outlined bind:active={animals.noAnimal} on:click={onNoAnimal}>No animal</Button>
    <Button toggle outlined bind:active={animals.cat} on:click={onAnimal}>Cat</Button>
    <Button toggle outlined bind:active={animals.mouse} on:click={onAnimal}>Mouse</Button>
    <Button toggle outlined bind:active={animals.hedgehog} on:click={onAnimal}>Hedgehog</Button>
    <Button toggle outlined bind:active={animals.bird} on:click={onAnimal}>Bird</Button>
    <Button toggle outlined bind:active={animals.fox} on:click={onAnimal}>Fox</Button>
    <Button toggle outlined bind:active={animals.otherAnimal} on:click={onAnimal}>Other animal</Button>
</ButtonGroup>
{:catch error}
<p>An error occurred!</p>
{/await}


