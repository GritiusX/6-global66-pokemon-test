<template>
	<section class="flex flex-col items-center px-4 pt-[35px]">
		<div
			class="flex items-center px-[15px] gap-[10px] w-full xs:max-w-[315px] xs2:max-w-[570px] h-[50px] bg-white rounded-[5px] focus-within:border focus-within:border-red-500"
		>
			<div>
				<Icon icon="ic:round-search" color="#BFBFBF" width="24" height="24" />
			</div>
			<input
				class="w-full bg-transparent text-medium focus-visible:outline-none placeholder:font-medium placeholder:leading-inputPlaceholder"
				type="text"
				v-model="searchInputValue"
				@keyup.enter="filterPokemon(searchInputValue)"
				placeholder="Search"
			/>
		</div>
	</section>
</template>

<script setup>
import { Icon } from "@iconify/vue";
import { usePokemonStore } from "../store/store";
import { storeToRefs } from "pinia";
const store = usePokemonStore();
const { searchInputValue, searchedSinglePokemon } = storeToRefs(store);
const { filterPokemon } = store;

const handleBlur = () => {
	if (searchInputValue.value === "") {
		searchedSinglePokemon.value = false;
	}
	searchInputValue.value = "";
};
</script>

<style scoped></style>
