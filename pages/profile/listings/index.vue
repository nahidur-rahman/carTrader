<script setup>
definePageMeta({
  layout: "custom",
  middleware: ['auth']
});


useHead({
  title: 'Car Listing'
})

const user = useSupabaseUser();
console.log(user.value.user_metadata.name)




const { listings } = useCars();
</script>

<template>
  <div>
    <div class="flex justify-between mt-24 items-center">
      <h1 class="text-5xl">{{user.user_metadata.name}}'s  Listing</h1>
      <NuxtLink to="/profile/listings/create"
        class="w-10 h-10 bg-blue-400 flex justify-center items-center rounded-full text-white cursor-pointer font-bold">+
      </NuxtLink>
    </div>
    <div class="shadow rounded p-3 mt-5">
      <CarListingCard v-for="listing in listings" :key="listing.id" :listing="listing" />
    </div>
  </div>
</template>
