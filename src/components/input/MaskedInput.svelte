<script >
  import MaskInput from "svelte-input-mask/MaskInput.svelte";
  import { getContext } from "svelte";
  import { key } from "./ts/key";

  export let params;
  const { leftIcon, label, inputName: name, maskOptions} = params;
  const { form, errors, touched, handleChange } = getContext(key);

  let maskedValue;

  const handleMaskChange = (event) => {
    const {detail} =  event;

    maskedValue =  detail.inputState.maskedValue;
    handleChange({target:{name, value: maskedValue}});


  };

  const handleMaskBlur = () => {
    handleChange({target:{name, value: maskedValue}});

  };
</script>

<div class="field">
  <label class="label" for={name}>{label}</label>
  <div class="control has-icons-left">
    <MaskInput
      class="input {$errors[name] ? 'is-danger': ''}"
      {name}
      id={name}
      type="text"
      on:change={handleMaskChange}
      on:blur={handleMaskBlur}
      bind:value={$form[name]}
      placeholder= {maskOptions.mask}
      mask={maskOptions.mask}
      maskString="+595 (9XX) XXX-XXX"
      size={maskOptions.size}
      alwaysShowMask

      {...$$props}
    />
    <span class="icon is-small is-left">
      <i class={leftIcon} />
    </span>
    {#if $errors[name]}
      <p class="help is-danger">{$errors[name]}</p>
    {/if}
  </div>
</div>

<style>

</style>
