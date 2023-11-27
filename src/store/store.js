import { defineStore } from "pinia";
import { ref, computed } from "vue";

import axios from "axios";

export const usePokemonStore = defineStore("pokemon", () => {
	const isLoading = ref(false);
	const hasError = ref(false);
	const allPokemon = ref([]);
	const togglePokemonModal = ref(false);
	const pokemonDetail = ref({});

	const favoritesPokemon = computed(() => {
		return allPokemon.value.filter((pokemon) => pokemon.favorite === true);
	});

	const findPokemonById = (id) => {
		return allPokemon.value.find((p) => p.id === id);
	};

	const getAllPokemon = async () => {
		try {
			isLoading.value = true;

			if (allPokemon.value.length > 0) {
				return allPokemon.value;
			}

			await new Promise((resolve) => setTimeout(resolve, 1500));

			const { data } = await axios.get(
				"https://pokeapi.co/api/v2/pokemon/?limit=1292"
			);

			allPokemon.value = data.results.map((pkmn) => ({
				...pkmn,
				id: parseInt(pkmn.url.split("/").slice(-2, -1)[0]),
				favorite: false,
			}));

			return allPokemon.value;
		} catch (error) {
			console.error("Failed to fetch all pokemons:", error);
		} finally {
			isLoading.value = false;
		}
	};

	const filterPokemon = (searchValue) => {
		const trimValue = searchValue.value.trim().toLowerCase();

		try {
			if (trimValue === "") {
				return allPokemon.value;
			}

			const isNumber = !isNaN(trimValue);

			if (isNumber) {
				hasError.value = true;
				return allPokemon.value;
			} else {
				const filteredPokemon = allPokemon.value.filter((pkmn) =>
					pkmn.name.includes(trimValue)
				);

				if (filteredPokemon.length > 0) {
					return filteredPokemon;
				} else {
					hasError.value = true;
					return allPokemon.value;
				}
			}
		} catch (error) {
			console.error("filterPokemonError", error);
		}
	};

	const addPkmnToFavorites = (pkmnId) => {
		try {
			const matchingPokemon = findPokemonById(pkmnId);

			if (matchingPokemon) {
				matchingPokemon.favorite = !matchingPokemon.favorite;
				pokemonDetail.value.favorite = matchingPokemon.favorite;
			} else {
				console.error("Pokemon not found in the list");
			}
		} catch (error) {
			console.error("Failed to add Pokemon to Favorites", error);
		}
	};

	const getPokemonDetails = async (pkmn) => {
		togglePokemonModal.value = true;

		if (pokemonDetail.value.id === pkmn.id) {
			return pokemonDetail.value;
		}

		try {
			const { data } = await axios.get(
				`https://pokeapi.co/api/v2/pokemon/${pkmn.id}`
			);
			console.log("data", data);

			const matchingPokemon = findPokemonById(pkmn.id);

			if (matchingPokemon) {
				pokemonDetail.value = {
					...data,
					favorite: matchingPokemon.favorite,
				};
				console.log("pokemonDetail", pokemonDetail.value);
				return pokemonDetail.value;
			} else {
				console.error("Matching Pokemon not found");
			}
		} catch (error) {
			console.error("Error fetching Pokemon details", error);
		}
	};

	return {
		isLoading,
		hasError,
		allPokemon,
		favoritesPokemon,
		togglePokemonModal,
		pokemonDetail,
		getAllPokemon,
		filterPokemon,
		addPkmnToFavorites,
		getPokemonDetails,
	};
});
