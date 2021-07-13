<script lang=ts>
  import Fa from 'svelte-fa';
  import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
  import type {TableModel} from '../table/table.interface'
  import { createEventDispatcher } from 'svelte';

  const dispatch = createEventDispatcher();

  type ModelType = $$Generic<TableModel>;
  export let dataList: ModelType[];
  export let tableHeaders: string[];

  function handleDelete(idToDelete: number){
    dispatch('delete', idToDelete);
  }

  function handleEdit(idToEdit: number){
    dispatch('edit', idToEdit );

  }
</script>

<slot name="table-filter">
  <span class="missing">Unknown Filter</span>
</slot>
<div class="table-container">
  <table class="table is-striped is-fullwidth">
    <thead>
      <tr>
        {#each tableHeaders as header (header)}
          <th>
              {header}
          </th>
        {/each}
        <th></th>
      </tr>
    </thead>
    <tbody>
      {#each dataList as model (model.id)}
        <tr>
          {#each Object.getOwnPropertyNames(model) as key (key)}
            {#if key ==='id'}
              <th>
                {model[key]}
              </th>
            {:else}
              <td>
                {model[key]}
              </td>
            {/if}
          {/each}
          <td>
            <div class="is-flex is-justify-content-center">
              <button class="button is-inverted is-danger" on:click={()=> handleDelete(model.id)}>
                <Fa icon={faTrash} color="red"/>
              </button>
              <button class="button is-inverted is-success" on:click={()=>handleEdit(model.id)}>
                <Fa icon={faEdit} />
              </button>
            </div>
          </td>
        </tr>    
      {/each}

    </tbody>
  </table>
</div>


<style>
  div.table-container{
    margin-top: 1.5rem;
  }
  button.button.is-inverted{
    background-color: transparent;
  }
 
</style>