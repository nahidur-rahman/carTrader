<script setup>
definePageMeta({
    layout: 'custom'
})

const supabase = useSupabaseClient();

const loading = ref(false);


const login = async () => {
    loading.value = true
    const { error } = supabase.auth.signInWithOAuth({
        provider: 'github'
    })
    if (error) {
        console.log(error)
    }
}

import gitImage from '@/assets/img/githubLogo.png';

</script>

<template>
    <div class="h-screen w-full flex items-center justify-center">
        <div class="p-4 border border-gray-300 shadow rounded w-1/3 h-">
            <h1 class="text-2xl text-center text-blue-400 text-bold mb-4">Log In</h1>
            <div class="relative items-center">
                <button @click="login"
                    class="w-full py-3 flex items-center justify-center bg-blue-400 text-white font-semibold rounded"
                    :disabled="loading" :class="{ 'cursor-not-allowed': loading }">Sign
                    In
                    with Github
                </button>
                <LoadingState v-if="loading" />
            </div>

        </div>
    </div>
</template>