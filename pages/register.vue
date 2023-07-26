<template>
  <div class="q-pa-md flex flex-col space-y-5" style="max-width: 400px">
    <q-h2 class="text-3xl font-bold text-center py-5">Register</q-h2>
    <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
      <q-input
        filled
        v-model="name"
        label="Your name *"
        hint="Name and surname"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-input
        filled
        type="text"
        v-model="password"
        label="Your password"
        lazy-rules
        :rules="[(val) => (val && val.length > 0) || 'Please type something']"
      />

      <q-toggle v-model="accept" label="I accept the license and terms" color="black" />

      <div>
        <q-btn label="Submit" type="submit" color="black" />
      </div>
    </q-form>
  </div>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";

const name = ref(null);
const password = ref(null);
const accept = ref(false);
const customerInfor = useCustomerInfor();

const onSubmit = async () => {
  if (accept.value === true) {
    await useFetch('/api/account/register', {
        method: "POST",
        body: {
            username: name.value,
            password: password.value,
        }
    })
    .then((res) => {
        customerInfor.value = res?.data;
        console.log(customerInfor.value)
        return navigateTo('/login')
    })
  }
};
</script>
