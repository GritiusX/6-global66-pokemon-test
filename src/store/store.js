import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "axios";

export const usePokemonStore = defineStore("pokemon", () => {
	const isLoading = ref(false);
	const hasError = ref(false);
	const allPokemon = ref([]);
	const singlePokemon = ref();
	const searchedSinglePokemon = ref(false);

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

	const filterPokemon = (pokemon) => {
		const isNumber = !isNaN(pokemon.value.toLowerCase());

		console.log(
			"filterPokemon2",
			pokemon.value,
			typeof pokemon.value,
			isNumber
		);
		try {
			if (isNumber) {
				const index = Number(pokemon.value) - 1;
				const isValidIndex = index >= 0 && index < allPokemon.value.length;

				if (isValidIndex) {
					console.log(allPokemon.value[index]);
					console.log(
						"el de abajo",
						(singlePokemon.value = allPokemon.value[index])
					);
					return (singlePokemon.value = allPokemon.value[index]);
				}
				return (hasError.value = true);
			}
		} catch (error) {
			console.log("filterPokemonError", error);
		}
		/* 		try {
			const isNumber = !isNaN(pkmnValue.value.toLowerCase());
			console.log(isNumber);
			if (isNumber) {
				const numericValue = Number(pkmnValue);
				if (numericValue === 0 || isNumber === null || isNumber === undefined) {
					pkmnValue = "";
					return (hasError.value = true);
				}
				return allPokemon.value[numericValue - 1];
			}

			let pokemonName = pkmnValue.toLowerCase();
			singlePokemon.value = copiedPokemon.find(
				(pkmn) => pkmn.name === pokemonName
			);

			if (!singlePokemon.value) {
				searchInputValue.value = "";
				return (hasError.value = true);
			}
			searchedSinglePokemon.value = true;
			return singlePokemon.value;
		} catch (error) {
			console.error("Failed to find a pokemon:", error);
		} */
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
		hasError,
		allPokemon,
		singlePokemon,
		searchedSinglePokemon,
		favoritesPokemon,
		getAllPokemon,
		filterPokemon,
		addPkmnToFavorites,
		getUniquePkmn,
	};
});
