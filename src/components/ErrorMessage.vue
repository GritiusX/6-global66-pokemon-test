<template>
	<div class="flex flex-col items-center gap-[10px] mt-[50px]">
		<h3 class="font-bold text-3xl">Uh-oh!</h3>
		<p>You look lost on your journey!</p>
		<Button route="home" class="mt-[25px]" @click="goBack">Go back home</Button>
	</div>
</template>

<script setup>
import { storeToRefs } from "pinia";
import Button from "../components/Button.vue";
import { usePokemonStore } from "../store/store";
const store = usePokemonStore();
const { hasError } = storeToRefs(store);

const goBack = () => {
	hasError.value = false;
};
</script>

<style scoped></style>
