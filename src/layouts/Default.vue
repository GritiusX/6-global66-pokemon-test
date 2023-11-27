<template>
	<section
		:class="`bg-[#F9F9F9] ${
			route.name !== 'Start' ? 'min-h-[calc(100vh-90px)]' : 'min-h-screen'
		}`"
	>
		<LoadingSpinner v-if="isLoading" />
		<section
			v-else
			class="flex flex-col gap-[10px] mx-auto items-center px-4 pt-[35px] pb-24"
		>
			<RouterView />
			<Navbar />
		</section>
	</section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import LoadingSpinner from "../components/LoadingSpinner.vue";

import { usePokemonStore } from "../store/store";
import Navbar from "../components/Navbar.vue";
const route = useRoute();

const store = usePokemonStore();
const { isLoading } = storeToRefs(store);
</script>

<style scoped></style>
