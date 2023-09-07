<script setup>
useHead({
  title: 'Messages',
  middleware: ['auth']
})
definePageMeta({
  layout: "custom",
});
const arr = [1, 2, 3, 4, 5];
</script>

<template>
  <div class="rounded mt-20 shadow">
    <CarMessageCard v-for="a in arr" :key="a" />
  </div>
</template>
