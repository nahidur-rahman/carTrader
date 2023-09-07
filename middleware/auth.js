export default defineNuxtRouteMiddleware((to,from)=>{
    const user = useSupabaseUser();
    if(user.value){
        // console.log(user.value)
        return;
    }
    return navigateTo('/login');
})



/**
 * ! If we want to include the global middleware, we can follow the steps
 * * Step 1: rename the auth.js file to auth.global.js
 *
 * * Step 2: We have to use the "to" parameter of the function.
 */

/*

export default defineNuxtRouteMiddleware((to,form)=>{
    if(to.path.includes("profile")){
        const user = useSupabaseUser();
        if(user.value){
            return;
        }
        return navigateTo('/login')
    }
})

*/

/**
 * * Step 3: If global is used, we have to remove the middleware in vue page files
 * ! in definePageMeta(), middleware has to be removed
 */
