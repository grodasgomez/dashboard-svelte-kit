<script>
import { isLoading } from "../../stores/loading.store";




</script>
<p class="button is-loading" 
  class:is-hidden={!$isLoading}
  {...$$props} ></p>

<style>
	p.button.is-loading {
		border: 0;
		color: black;
	}
</style>
