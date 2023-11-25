import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const usePokemonStore = defineStore("pokemon", () => {
	const isLoading = ref(false);
	const hasError = ref(false);
	const allPokemon = ref([]);
	const singlePokemon = ref();
	const searchedSinglePokemon = ref(false);
	const searchInputValue = ref("");

	const favoritesPokemon = computed(() => {
		return allPokemon.value.filter((pokemon) => pokemon.favorite === true);
	});

	const getAllPokemon = async () => {
		if (allPokemon.value.length > 0) {
			return allPokemon.value;
		}
		try {
			isLoading.value = true;
			const { data } = await axios.get(
				"https://pokeapi.co/api/v2/pokemon/?limit=1292"
			);
			data.results.forEach((pkmn) => (pkmn.favorite = false));
			allPokemon.value = data.results;
			return allPokemon.value;
		} catch (error) {
			console.error("Failed to fetch all pokemons:", error);
		} finally {
			isLoading.value = false;
		}
	};

	const filterPokemon = (pkmnValue) => {
		console.log("caca", pkmnValue);
		try {
			const isNumber = !isNaN(pkmnValue.toLowerCase());
			console.log(isNumber);
			if (isNumber) {
				const numericValue = Number(pkmnValue);
				if (numericValue === 0 || isNumber === null || isNumber === undefined) {
					searchInputValue.value = "";
					return (hasError.value = true);
				}
				return allPokemon.value[numericValue - 1];
			}
			/* 
			let pokemonName = pkmnValue.toLowerCase();
			singlePokemon.value = copiedPokemon.find(
				(pkmn) => pkmn.name === pokemonName
			);

			if (!singlePokemon.value) {
				searchInputValue.value = "";
				return (hasError.value = true);
			}
			searchedSinglePokemon.value = true;
			return singlePokemon.value; */
		} catch (error) {
			console.error("Failed to find a pokemon:", error);
		}
	};

	const addPkmnToFavorites = (pkmnIndex) => {
		try {
			allPokemon.value[pkmnIndex].favorite =
				!allPokemon.value[pkmnIndex].favorite;
		} catch (error) {
			console.error("Failed to add pokemon to Favorites", error);
		}
	};

	const getUniquePkmn = async (url) => {
		try {
			const { data } = await axios.get(url);
			singlePokemon.value = data;
			return singlePokemon.value;
		} catch (error) {
			console.error("Failed to fetch a specific pokemon:", error);
			return (hasError.value = true);
		}
	};

	return {
		isLoading,
		allPokemon,
		singlePokemon,
		searchInputValue,
		searchedSinglePokemon,
		hasError,
		favoritesPokemon,
		getAllPokemon,
		getUniquePkmn,
		filterPokemon,
		addPkmnToFavorites,
	};
});
