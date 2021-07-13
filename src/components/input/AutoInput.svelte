<script lang="ts">
	import type { AutoInputOptions } from './ts/input.interface';
	import { createEventDispatcher, getContext } from 'svelte';
	import { key } from './ts/key';
	import Fa from 'svelte-fa';
  import { findModel } from '../../common/utils';

  const dispatch = createEventDispatcher();
	export let params: AutoInputOptions;
	const {
		leftIcon,
		label,
		inputName,
		leftText,
		inputChange,
		optionLabel,
		ms = 1000,
		optionValue
	} = params;
	const { form, errors, handleChange } = getContext(key);

	const autocompleteId = inputName + '-' + 'autocomplete';

  const dataList = inputChange.getDataList();

	let timer;
	// Every time that the input changes, this code block will be executed
	function handleOnKeyUp() {
    const value = $form[inputName];
    const option = findModel($dataList, value);
    if(option) {
      dispatch('selected', option);
    }else{
      clearTimeout(timer);
		  timer = setTimeout(inputChange.handler, ms);
    }
		
	}

  $:{console.log($dataList);}

</script>

<div class="field">
	<label class="label" for={inputName} class:has-text-danger={$errors[inputName]}>
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
					placeholder={'Tu '.concat(label.toLowerCase())}
					on:change={handleChange}
					on:blur={handleChange}
					on:keyup={handleOnKeyUp}
					bind:value={$form[inputName]}
					class:is-danger={$errors[inputName]}
					{...$$props}
					list={autocompleteId}
					autocomplete="off"
				/>
				<datalist id={autocompleteId}>
					{#each $dataList as option (option)}
						<option value={option[optionValue]}>{optionLabel(option)}</option>
					{/each}
				</datalist>
       
			</div>
		</div>
		{#if $errors[inputName]}
			<p class="help is-danger">{@html $errors[inputName]}</p>
		{/if}
	</div>
</div>

<style>
	div.control.has-input {
		flex: 1;
	}
</style>
