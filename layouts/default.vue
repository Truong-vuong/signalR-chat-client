<template>
  <main>
    <header>
        <div>
          <q-toolbar class="bg-black text-white shadow-2">
            <q-btn flat round dense icon="menu" class="q-mr-sm" />
            <q-space />
            <q-chip class="cursor-pointer text-black" color="white" outlined>
              <nuxt-link to="/register">Register</nuxt-link>
            </q-chip>
          </q-toolbar>
        </div>
      </header>
    <main class="flex flex-col p-4 justify-center items-center">
        <slot></slot>
    </main>
    <footer></footer>
  </main>
</template>

<script setup lang="ts">
  const model = ref("one");
</script>