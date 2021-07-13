<script lang="ts">
  import type { InputInterface } from "./ts/input.interface";
  import { createEventDispatcher, getContext } from "svelte";
  import { key } from "./ts/key";
  import Fa from 'svelte-fa'

  const dispatch = createEventDispatcher();

  export let params: InputInterface;
  const { leftIcon, label, inputName, leftText } = params;
  const { form, errors, handleChange } = getContext(key);
  
</script>
<div class="field">
  <label class="label" for={inputName}
   class:has-text-danger={$errors[inputName]}>
    {label}
  </label>
  <div class="control">
    <div class="field has-addons">
      <div class="control">
        <p class="button is-static">
          {#if leftIcon}
            <span class="icon is-small">
              <Fa icon={leftIcon} />
            </span>
          {/if}
         
          {#if leftText}
            <span class="p-0">
              {leftText}
            </span>
          {/if}
        </p>
      </div>

      <div class="control has-input">
        <input
        class="input"
        name={inputName}
        id={inputName}
        type="text"
        placeholder={"Tu ".concat(label.toLowerCase())}
        on:change={handleChange}
        on:blur={handleChange}
        on:keyup={(event) => dispatch('keyup', event)}
        bind:value={$form[inputName]}
        class:is-danger={$errors[inputName]}
        {...$$props}
        />
      </div>
    </div>
    {#if $errors[inputName]}
    <p class="help is-danger">{@html $errors[inputName]}</p>
  {/if}
    </div>
</div>

<style>
  div.control.has-input{
    flex: 1;
  }
</style>