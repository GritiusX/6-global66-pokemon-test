<template>
	<div
		class="flex justify-between w-full xs:max-w-[315px] xs2:max-w-[570px] max-h-[60px] py-2 px-[10px] items-center rounded-[5px] capitalize bg-white hover:bg-gray-300"
		v-for="(pkmn, index) in pokemons"
		:key="index"
	>
		<p class="ml-[10px]">{{ pkmn.name }}</p>
		<div
			class="inline-block rounded-full bg-slate-100 p-2 cursor-pointer"
			@click="addPkmnToFavorites(index)"
		>
			<Icon
				icon="material-symbols:kid-star"
				:color="pkmn.favorite ? '#ECA539' : '#BFBFBF'"
				width="28"
				height="28"
			/>
		</div>
	</div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import { usePokemonStore } from "../store/store";

const pokemons = ref([]);

const props = defineProps({
	showFavorite: {
		type: Boolean,
		default: false,
	},
});

const store = usePokemonStore();
const { addPkmnToFavorites } = store;
const { favoritesPokemon } = storeToRefs(store);
const { getAllPokemon } = store;

onMounted(async () => {
	if (!props.showFavorite) {
		pokemons.value = await getAllPokemon();
	} else {
		pokemons.value = favoritesPokemon.value;
	}
});
</script>

<style scoped></style>
