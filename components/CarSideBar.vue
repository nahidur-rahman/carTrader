<script setup>
const { makes } = useCars();
const route = useRoute();
const router = useRouter();
const city = ref("");
const modal = ref({
  location: false,
  make: false,
  price: false,
});

const priceRange = ref({
  min: route.query.minPrice ?? "",
  max: route.query.maxPrice ?? "",
});

const priceRangeText = computed(() => {
  const minPrice = route.query.minPrice;
  const maxPrice = route.query.maxPrice;

  if (!minPrice && !maxPrice) {
    return "Any";
  } else if (!minPrice && maxPrice) {
    return `< $${maxPrice}`;
  } else if (minPrice && !maxPrice) {
    return `> $${minPrice}`;
  } else {
    return `$${minPrice} - $${maxPrice}`;
  }
});

const updateModal = (key) => {
  modal.value[key] = !modal.value[key];
};

const updateLocation = () => {
  if (city.value === "") {
    return;
  }
  if (!isNaN(parseInt(city.value))) {
    throw createError({
      statusCode: 500,
      message: `${city.value} is invalid location`,
    });
  }
  navigateTo(`/city/${city.value}/car/${route.params.make}`);
  updateModal("location");
  city.value = "";
};

const updateMake = (make) => {
  updateModal("make");
  navigateTo(`/city/${route.params.city}/car/${make}`);
};

const updatePrice = () => {
  if (priceRange.value.min && priceRange.value.max) {
    if (priceRange.value.min >= priceRange.value.max) {
      throw createError({
        statusCode: 505,
        message: "Price Range is InValid",
      });
    }
    router.push({
      query: {
        minPrice: priceRange.value.min,
        maxPrice: priceRange.value.max,
      },
    });
    updateModal("price");
  } else if (!priceRange.value.min) {
    router.push({
      query: {
        maxPrice: priceRange.value.max,
      },
    });
    updateModal("price");
  } else {
    router.push({
      query: {
        minPrice: priceRange.value.min,
      },
    });
    updateModal("price");
  }
};

// console.log(router)

const clearFilters = () => {
navigateTo(`/city/${route.params.city}/car`)
}


const closeModal = () => {

}
</script>

<template>
  <div class="shadow border w-72 mr-10 z-30 h-[275px]">
    <!-- location  -->
    <div class="relative cursor-pointer border-b flex justify-between p-5">
      <h3>Location</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('location')">
        {{ route.params.city }}
      </h3>

      <!-- modal  -->

      <div v-if="modal.location" class="absolute border shadow-md hover:shadow-lg left-56 p-5 top-1 -m-1 bg-white">
        <button @click="updateModal('location')" class="h-5 w-5 text-red-400 absolute top-0 right-2">X</button>
        <input type="text"  class="p-1 mt-2 border rounded" v-model="city" @keyup.enter="updateLocation" />
        <button class="bg-blue-400 w-full mt-2 rounded text-white p-1" @click="updateLocation">
          Apply
        </button>
      </div>

      <!-- modal ends  -->
    </div>
    <!-- location  -->

    <!-- make  -->
    <div class="relative cursor-pointer border-b flex justify-between p-5">
      <h3>Make</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('make')">
        {{ route.params.make || "Any" }}
      </h3>
      <!-- modal of make  -->
      <div v-if="modal.make"
        class="absolute border shadow hover:shadow-lg left-56 p-5 top-1 -m-1 bg-white w-[600px] flex justify-between flex-wrap">
        <button @click="updateModal('make')" class="h-5 w-5 text-red-400 absolute top-0 right-2">X</button>
        <h4 class="text-gray-700 my-1 w-1/3 border-b border-gray-300 p-2 hover:font-medium hover:text-blue-400"
          v-for="make in makes" :key="make" @click="updateMake(make)">
          {{ make }}
        </h4>
      </div>
    </div>
    <!-- make ends  -->

    <!-- price  -->
    <div class="relative cursor-pointer flex justify-between p-5 border-b">
      <h3>Price</h3>
      <h3 class="text-blue-400 capitalize" @click="updateModal('price')">
        {{ priceRangeText }}
      </h3>
      <!-- price modal  -->
      <div v-if="modal.price" class="absolute border shadow hover:shadow-lg left-56 p-5 -m-1 bg-white">
        <button @click="updateModal('price')" class="h-5 w-5 text-red-400 absolute top-0 right-2">X</button>
        <input type="number" v-model="priceRange.min" class="p-1 border rounded" placeholder="Minimum Price" />
        <input type="number" v-model="priceRange.max" class="p-1 border rounded mt-2" placeholder="Maximum Price" />
        <button class="bg-blue-400 w-full mt-2 rounded text-white p-1" @click="updatePrice">
          Apply
        </button>
      </div>
      <!-- price modal  -->
    </div>
    <!-- price  -->
    <!-- clear all filter  -->
    <div class="p-5 relative cursor-pointer">
      <button @click="clearFilters" class="w-full py-2 px-4 rounded bg-blue-400 text-white hover:shadow">Clear All Filter</button>
    </div>
    <!-- clear all filter  -->
  </div>
</template>


<style scoped>
/*

*/

</style>
