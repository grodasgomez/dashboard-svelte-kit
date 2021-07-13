<script lang="ts">
	import { createForm } from 'svelte-forms-lib';
	import * as yup from 'yup';
	import { createEventDispatcher, setContext } from 'svelte';
	import Input from '../input/Input.svelte';
	import { key } from '../input/ts/key';
	import { faAt, faUser } from '@fortawesome/free-solid-svg-icons';
	import { MESSAGE_ERROR } from '../input/ts/messages-error';
	import { isLoading } from '../../stores/loading.store';
	import Spinner from '../spinner/Spinner.svelte';
	import { getPersonByRuc } from '../../services/ruc.service';
	import AutoInput from '../input/AutoInput.svelte';
	import { writable } from 'svelte/store';
	export let showModal;

	const dispatch = createEventDispatcher();
	const {
		form,
		errors,
		handleChange,
		handleSubmit,
		handleReset,
		touched,
		updateField,
    validateField
	} = createForm({
		initialValues: {
			documentNumber: '',
			denomination: '',
			phoneNumber: '',
			email: ''
		},
		validationSchema: yup.object().shape({
			documentNumber: yup.string(),
			denomination: yup.string().required(MESSAGE_ERROR.REQUIRED('razon social')),
			phoneNumber: yup
				.string()
				.required(MESSAGE_ERROR.REQUIRED('numero de telefono'))
				.length(8, MESSAGE_ERROR.LENGTH('numero de telefono', 8)),
			email: yup
				.string()
				.required(MESSAGE_ERROR.REQUIRED('email'))
				.email(MESSAGE_ERROR.EMAIL('email'))
		}),
		onSubmit: (values) => {
			dispatch('submit', values);
			handleReset();
		}
	});

	setContext(key, { form, errors, handleChange, touched });

	function handleCloseModal() {
		dispatch('closeModal');
		handleReset();
	}

	function createHandler() {
		let dataList = writable([]);
		async function handler() {
			const resp = await getPersonByRuc($form.documentNumber);
			if (resp.length === 1) handleSelectedPerson({ detail: resp[0] });
      if(resp.length === 0) updateField('denomination', '');
			dataList.set(resp);
		}
		function getDataList() {
			return dataList;
		}
		return { handler, getDataList };
	}

	function handleSelectedPerson(event) {
		const selectedPerson = event.detail;
		updateField('denomination', selectedPerson.denomination);
		updateField('documentNumber', selectedPerson.ruc);
		validateField('denomination');
	}
</script>

<div id="client-modal" class="modal" class:is-active={showModal}>
	<div class="modal-background" />
	<div class="modal-card animate__animated animate__fadeInUp">
		<form on:submit={handleSubmit}>
			<header class="modal-card-head">
				<p class="modal-card-title">Nuevo Cliente</p>
				<button type="reset" class="delete" aria-label="close" on:click={handleCloseModal} />
			</header>
			<section class="modal-card-body">
				<div class="columns is-multiline">
					<div class="column is-6 ">
						<AutoInput
							params={{
								inputName: 'documentNumber',
								label: 'RUC/CI',
								leftIcon: faUser,
								inputChange: createHandler(),
								optionValue: 'denomination',
								optionLabel: (person) => {
									return person.ruc;
								}
							}}
							disabled={$isLoading}
							on:selected={handleSelectedPerson}
						/>
					</div>
					<div class="column is-6 is-flex is-align-items-center">
						<Spinner />
					</div>
					<div class="column is-12">
						<Input
							params={{
								inputName: 'denomination',
								label: 'Razon Social',
								leftIcon: faUser
							}}
							disabled={$isLoading}
						/>
					</div>

					<div class="column is-6">
						<Input
							params={{
								inputName: 'email',
								label: 'Email',
								leftIcon: faAt
							}}
						/>
					</div>

					<div class="column is-6">
						<Input
							params={{
								inputName: 'phoneNumber',
								label: 'Numero de telefono',
								placeholder: '82123456',
								leftText: '+595 9'
							}}
							maxlength="8"
						/>
					</div>
				</div>
			</section>
			<footer class="modal-card-foot">
				<button type="submit" class="button is-success">Guardar</button>
				<button type="reset" class="button" on:click={handleCloseModal}> Cancelar </button>
			</footer>
		</form>
	</div>
</div>

<style>
	.animate__animated.animate__fadeInUp {
		animation-duration: 500ms;
	}
</style>
