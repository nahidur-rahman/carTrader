<script setup>

const loading = ref(false);
const user = useSupabaseUser();

// console.log(user)

const supabase = useSupabaseClient();

// console.log(supabase, "Supabase")


const logOut = async () => {
  loading.value = true;
  setTimeout(() => {
    const { error } = supabase.auth.signOut();
  }, 1000)

  if (error) {
    console.log(error)
  }
  user.value = null
  navigateTo('/');
  loading = false;

}

// console.log(user)

</script>

<template>
  <div>
    <header class="sticky top-0 z-50 flex items-center justify-between p-5 shadow-md bg-blue-400 text-white space-x-1">
      <NuxtLink to="/" class="text-3xl font-mono">
        CarTrade BD
      </NuxtLink>
      <div class="flex align-center justify-center text-xl" v-if="user">
        <NuxtLink class="hover:text-black mr-5" to="/profile/listings">Profile</NuxtLink>
        <div class="relative items-center">
          <p @click="logOut" class="hover:text-red-400 cursor-pointer flex align-items-">Log Out</p>
          <LoadingState v-if="loading" />
        </div>

      </div>
      <NuxtLink v-else to="/login" class="text-xl hover:text-black">LogIn</NuxtLink>
    </header>
  </div>
</template>

<style scoped>
/* .headerContainer,
.headerContainer::before,
.headerContainer::after {
  border-bottom: 0 !important;
  margin-bottom: 0 !important;
  border: none !important;
  border-style: none !important;
} */
</style>
