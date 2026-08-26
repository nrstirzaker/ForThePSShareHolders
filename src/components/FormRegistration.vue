<template>

  <form @submit.prevent="submit">

    <div> {{ headerErrorMessage }}</div>

    <label for="emailAddress">Email Address: </label>
    <input id="emailAddress" name="emailAddress" type="email" required/>
    <div >{{ errorMessages?.emailAddressErrorMessage }}</div>

    <input id="ipAddress" name="ipAddress" type="text" v-model="ipAddress" />

    <button
        class="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        type="submit">
      Register
    </button>

  </form>
</template>

<script setup lang="ts">

import {onBeforeMount, onMounted, ref} from "vue";
import {ErrorMessageFactory} from "@/lib/error/ErrorMessageFactory.ts"
import {FormTypeEnum} from "@/lib/FormTypeEnum.ts";
import {RegisterAPIDataResponse} from "@/lib/RegisterAPIDataResponse.ts";
import {ErrorCode} from "@/lib/error/ErrorCode.ts";
import {ErrorMessages} from "@/lib/error/ErrorMessages.ts";
import {NBSP} from "@/constants/constants.ts";
import {logger} from "@/utils/logger"


const ipAddress = ref<string>()
const emailAddress = ref<string>()
const lastId = ref<number>()
const errorMessages = ref<ErrorMessages>()
const headerErrorMessage = ref<string>()

onBeforeMount(async () => {
  const noErrorCodes : ErrorCode[] = []
  errorMessages.value = ErrorMessageFactory.instance.getMessage(FormTypeEnum.Registration, noErrorCodes);
  deriveAnyHeaderErrors()
})

onMounted(async () => {

  const response = await fetch(' https://ipapi.co/json/',  {
    method:"GET"
  });

  const data = await response.json();
  ipAddress.value = data.ip
  if (!data?.ipAddress) {
    logger.log({level: "error",message:"IP address not provided"})
  }


})

function deriveAnyHeaderErrors(){

  if ( errorMessages.value?.maxEmailsFromThisIPAddress && errorMessages.value.maxEmailsFromThisIPAddress !== NBSP ){
    headerErrorMessage.value  = errorMessages.value.maxEmailsFromThisIPAddress;
    return
  }

  if ( errorMessages.value?.maxRegistrationSpeed && errorMessages.value.maxRegistrationSpeed !== NBSP ){
    headerErrorMessage.value  = errorMessages.value.maxRegistrationSpeed;
    return
  }

  headerErrorMessage.value = NBSP

}

async function submit(e: Event) {
  const formData = new FormData(e.currentTarget as HTMLFormElement);
  const response = await fetch("/api/register", {
    method: "POST",
    body: formData,
  });

  const dataResponse: RegisterAPIDataResponse = await response.json();

  emailAddress.value = dataResponse.emailAddress
  lastId.value = dataResponse.lastId;
  const errorCodes : ErrorCode[] | undefined = dataResponse.errorCodes

  errorMessages.value = ErrorMessageFactory.instance.getMessage(FormTypeEnum.Registration, errorCodes);
  deriveAnyHeaderErrors()

}

</script>


<style scoped>

</style>