<script setup>

const route = useRoute();

const {data:cars, refresh} = await useFetchCars(route.params.city, {
  minPrice: route.query.minPrice,
  maxPrice: route.query.maxPrice,
  make: route.params.make
});

watch(
 ()=>route.query,
 ()=>{
  window.location.reload(true)}
 )


// watch((route.query),()=>{
//  window.location.reload()
// },{deep:true})

</script>

<template>
  <CarCards :cars="cars" />
</template> 
