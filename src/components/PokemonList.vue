<template>
	<div
		class="flex items-center px-[15px] mb-[30px] gap-[10px] w-full xs:max-w-[315px] xs2:max-w-[570px] h-[50px] bg-white rounded-[5px] focus-within:border focus-within:border-red-500 transition-all duration-300"
	>
		<div>
			<Icon icon="ic:round-search" color="#BFBFBF" width="24" height="24" />
		</div>
		<input
			class="w-full bg-transparent text-medium focus-visible:outline-none placeholder:font-medium placeholder:leading-inputPlaceholder"
			type="text"
			v-model="searchInputValue"
			@keyup.enter="handleFilterPokemon"
			placeholder="Search"
		/>
	</div>
	<ErrorMessage v-if="hasError" />
	<div
		v-else
		class="flex justify-between w-full xs:max-w-[315px] xs2:max-w-[570px] max-h-[60px] py-2 px-[10px] items-center rounded-[5px] cursor-pointer capitalize bg-white hover:bg-gray-500 hover:text-white hover:font-semibold transition-all duration-300"
		v-for="pkmn in pokemons"
		:key="pkmn.id"
		@click="getPokemonDetails(pkmn)"
	>
		<p class="ml-[10px]">{{ pkmn.name }}</p>
		<div
			class="inline-block rounded-full bg-slate-100 p-2 cursor-pointer"
			@click.stop="addPkmnToFavorites(pkmn.id)"
		>
			<Icon
				icon="material-symbols:kid-star"
				:color="pkmn.favorite ? '#ECA539' : '#BFBFBF'"
				width="28"
				height="28"
			/>
		</div>
	</div>
	<PokemonModal />
</template>

<script setup>
import ErrorMessage from "../components/ErrorMessage.vue";
import PokemonModal from "../components/PokemonModal.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import { usePokemonStore } from "../store/store";
const route = useRoute();
const router = useRouter();

const pokemons = ref([]);

const store = usePokemonStore();
const { addPkmnToFavorites } = store;
const { favoritesPokemon, hasError } = storeToRefs(store);
const { getAllPokemon, filterPokemon, getPokemonDetails } = store;

const searchInputValue = ref("");

const handleFilterPokemon = () => {
	if (route.name !== "Home" && searchInputValue.value === "") {
		return router.push("/home");
	}
	pokemons.value = filterPokemon(searchInputValue);
	searchInputValue.value = "";
};

onMounted(async () => {
	if (route.name === "Favorites") {
		pokemons.value = favoritesPokemon.value;
	} else {
		pokemons.value = await getAllPokemon();
	}
});
</script>

<style scoped></style>
