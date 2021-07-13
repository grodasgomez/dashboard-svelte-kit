<script lang="ts">
  import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
  import { createEventDispatcher } from "svelte";
  import Fa from "svelte-fa";
  import type { FieldFilter } from "./table.interface";

  export let params: FieldFilter[];

  let showFilter = true;
  const dispatch = createEventDispatcher();
  function handleFilter() {
    dispatch("filter");
  }
  function handleClean() {
    params.forEach((p) => (p.value = ""));
    params = params;
  }

  function handleToogle() {
    showFilter = !showFilter;
  }
</script>

<div class="card">
  <header class="card-header">
    <p class="card-header-title">Filtros</p>
    <button
      class="card-header-icon"
      aria-label="more options"
      on:click={handleToogle}
    >
      <span class="icon" class:hidden={showFilter}>
        <Fa icon={faAngleDown}/>
        </span>
    </button>
  </header>
  <div
    class="card-content animate__animated animate__fadeInUp"
    class:is-hidden={!showFilter}
  >
    <div class="columns is-multiline">
      {#each params as param (param)}
        <div class="column is-3">
          <label class="label" for={param.name}
            >{param.label}
            <input
              type="text"
              class="input"
              placeholder={`${param.label} a buscar`}
              id={param.name}
              bind:value={param.value}
            />
          </label>
        </div>
      {/each}
    </div>
  </div>
  <footer
    class="card-footer animate__animated animate__fadeInUp"
    class:is-hidden={!showFilter}
  >
    <button class="button is-info is-light" on:click={handleFilter}>
      Buscar
    </button>

    <button class="button is-warning is-light" on:click={handleClean}>
      Limpiar
    </button>
  </footer>
</div>

<style>
  span.icon {
    transition: transform 500ms ease;
  }
  span.icon.hidden {
    transform: rotate(180deg);
    transition: transform 500ms ease;
  }
  .animate__animated.animate__fadeInUp {
    animation-duration: 500ms;
  }
</style>
