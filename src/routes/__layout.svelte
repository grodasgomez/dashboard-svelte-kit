<script lang="ts">
	import Sidebar from '../components/sidebar/Sidebar.svelte';

</script>

<header>
	THis is a header
</header>
<main>
	<div class="columns">
		<div class="sidebar-container column is-2">
			<Sidebar/>
		</div>
		<div class="column is-10">
			<slot />

		</div>
	</div>
</main>

<footer>
	<p>visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>

<style>
	header{
		height: 5vh;
		background-color: #9AA899;

	}
	
	main {
		height: 90vh;

	}
	div.columns{
		height:100%;
		width: 100%;
		margin:0;
		overflow-y: auto;

	}



	.sidebar-container.column{
		padding: 0;
	}
	

	footer{
		height: 5vh;
		background-color: #9AA899;
	}

	:global(small.is-danger){
    color:red;
  }
</style>
