<template>
	<form @submit.prevent="submit">
		<div>{{ headerErrorMessage }}</div>

		<label for="emailAddress">Email Address: </label>
		<input id="emailAddress" name="emailAddress" /><!--required type="email"/>-->
		<div>{{ errorMessages?.emailAddressErrorMessage }}</div>

		<button class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" type="submit" @keyup.enter="submit">Register</button>
	</form>
</template>

<script lang="ts" setup>
import { onBeforeMount } from 'vue';
import { ErrorMessageFactory } from '@/lib/error/ErrorMessageFactory.ts';
import { FormTypeEnum } from '@/lib/FormTypeEnum.ts';
import { RegisterAPIResponse } from '@/lib/RegisterAPIResponse.ts';
import { ErrorCodes } from '@/lib/error/ErrorCodes.ts';
import ErrorCode = ErrorCodes.ErrorCode;

import { ErrorMessages } from '@/lib/error/ErrorMessages.ts';
import { NBSP } from '@/constants/constants.ts';

let emailAddress: string | undefined;
let lastId: string | undefined;
let nextPage: string | undefined;
let errorMessages: ErrorMessages;
let headerErrorMessage: string | undefined;

onBeforeMount(async () => {
	const noErrorCodes: ErrorCode[] = [];
	errorMessages = ErrorMessageFactory.instance.getMessage(FormTypeEnum.Registration, noErrorCodes);
	deriveAnyHeaderErrors();
});

function deriveAnyHeaderErrors() {
	if (errorMessages?.maxEmailsFromThisIPAddress && errorMessages.maxEmailsFromThisIPAddress !== NBSP) {
		headerErrorMessage = errorMessages.maxEmailsFromThisIPAddress;
		return;
	}

	if (errorMessages?.maxRegistrationSpeed && errorMessages.maxRegistrationSpeed !== NBSP) {
		headerErrorMessage = errorMessages.maxRegistrationSpeed;
		return;
	}

	headerErrorMessage = NBSP;
}

async function submit(e: Event) {
	console.log('FormRegistration:submit:start');
	const formData = new FormData(e.currentTarget as HTMLFormElement);
	const response = await fetch('/api/v1/register', {
		method: 'POST',
		body: JSON.stringify(Object.fromEntries(formData))
	});
	console.log('FormRegistration:submit:end');

	// const dataResponse: RegisterAPIResponse = await response.json();
	//
	// emailAddress = dataResponse.emailAddress;
	// lastId = dataResponse?.lastId;
	// nextPage = dataResponse.nextPage;
	// console.log('nextPage.value: ' + nextPage);
	// const errorCodes: ErrorCode[] | undefined = dataResponse.errorCodes;
	//
	// if (errorCodes && errorCodes.length != 0) {
	// 	errorMessages = ErrorMessageFactory.instance.getMessage(FormTypeEnum.Registration, errorCodes);
	// 	deriveAnyHeaderErrors();
	// } else {
	// 	window.location.href = nextPage || '/';
	// }
}
</script>

<style scoped></style>
