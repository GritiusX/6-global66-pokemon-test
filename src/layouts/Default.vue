<template>
	<section
		:class="`bg-[#F9F9F9]  ${
			route.name !== 'Start' ? 'min-h-[calc(100vh-60px)]' : 'min-h-screen'
		}`"
	>
		<LoadingSpinner v-if="isLoading" />
		<Input v-if="route.name !== 'Start'" />
		<ErrorMessage v-if="hasError" />
		<section
			v-else
			class="flex flex-col gap-[10px] mx-auto items-center px-4 pt-[35px] pb-24"
		>
			<RouterView />
		</section>
		<Navbar v-if="route.name !== 'Start' && !isLoading" />
	</section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import ErrorMessage from "../components/ErrorMessage.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import Input from "../components/Input.vue";
import { usePokemonStore } from "../store/store";
import Navbar from "../components/Navbar.vue";
const route = useRoute();

const store = usePokemonStore();
const { isLoading, hasError } = storeToRefs(store);
</script>

<style scoped></style>
