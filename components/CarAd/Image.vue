<script setup>

const image = useState('carImage', () => {
    return {
        preview: null,
        image: null
    }
})

const emit = defineEmits(['changeInput']);

const onImageUpload = (event) => {
    const input = event.target;
    if (input.files) {
        const reader = new FileReader();
        // console.log(reader)
        reader.onload = (e) => {

            image.value.preview = e.target.result;
        }
        image.value.image = input.files[0]
        reader.readAsDataURL(input.files[0])
        emit("changeInput", input.files[0], "image")
    }
}

const removePreviewImage = () => {
    image.value.preview = null;
    image.value.image = null;
}

</script>

<template>
    <div class="col-md-5 offset-md-1 mt-2 w-[100%]">
        <label for="" class="text-cyan-500 mb-1 text-sm">Image *</label>
        <form class="mt-2">
            <div class="form-group">
                <div class="relative">
                    <input type="file" accept="image/*" class="opacity-0 absolute  cursor-pointer"
                        @change="onImageUpload" />
                    <span class="cursor-pointer z-1">Browse File</span>
                </div>
                <div class="border p-2 mt-2 w-56 relative" v-if="image.preview">
                    <div class="absolute mt-1 right-4 text-red-500 font-semibold cursor-pointer"
                        @click="removePreviewImage">X</div>
                    <img :src="image.preview" class="img-fluid" />
                </div>
            </div>
        </form>
    </div>
</template>


<style scoped>
.customCursor {
    cursor: pointer;
}
</style>