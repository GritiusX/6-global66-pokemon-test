<template>
	<section class="flex flex-col w-full items-center">
		<article class="flex w-full justify-center mt-16.5">
			<img
				src="../assets/pikachuLogo.svg"
				alt="Pikachu logo waving at the user smiling"
			/>
		</article>
		<article
			class="flex flex-col w-full items-center text-center mt-[60px] mb-[50px] px-[15px] gap-y-[30px] md:w-[52%]"
		>
			<h1 class="font-bold text-2.5xl leading-pokemon">Welcome to Pokédex</h1>
			<p class="font-medium text-[18px]">
				The digital encyclopedia created by Professor Oak is an invaluable tool
				to Trainers in the Pokémon world.
			</p>
		</article>
		<article>
			<Button @click="handleGetStarted"> Get started </Button>
		</article>
	</section>
</template>

<script setup>
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import Button from "../components/Button.vue";
import { usePokemonStore } from "../store/store";
const store = usePokemonStore();
const router = useRouter();
const { isLoading } = storeToRefs(store);

const handleGetStarted = async () => {
	await new Promise((resolve, reject) => {
		isLoading.value = true;

		setTimeout(() => {
			resolve();
			isLoading.value = false;
		}, 3000);
	});
	return router.push(`/home`);
};
</script>

<style scoped></style>
