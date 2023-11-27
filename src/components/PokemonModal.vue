<template>
	<section
		v-if="togglePokemonModal"
		@click="togglePokemonModal = false"
		class="bg-black/60 fixed h-screen w-full z-10 -mt-[35px] transition duration-300"
	>
		<div
			@click.stop
			class="relative mx-auto rounded-lg top-[20%] min-w-[315px] xs:w-[315px] xs2:w-full xs2:max-w-[570px] bg-white z-20"
		>
			<div class="relative">
				<Icon
					class="inline-block absolute top-[15px] right-[15px] cursor-pointer"
					@click="togglePokemonModal = false"
					icon="mingcute:close-circle-fill"
					color="white"
					width="26"
					height="26"
				/>
				<div
					class="w-full flex justify-center items-center rounded-t-lg pokemon-background"
				>
					<img
						class="h-[180px] my-[20px]"
						:src="
							pokemonDetail.sprites?.other?.['official-artwork'].front_default
								? pokemonDetail.sprites?.other?.['official-artwork']
										.front_default
								: pokemonDetail.sprites?.front_default
								? pokemonDetail.sprites?.front_default
								: 'src/assets/noPhoto.svg'
						"
						:alt="`${pokemonDetail.name} image`"
					/>
				</div>
			</div>
			<div
				class="flex flex-col px-[30px] py-[20px] gap-[10px] modal-modal text-lg"
			>
				<p class="capitalize">
					<span class="font-bold">Name:</span> {{ pokemonDetail.name }}
				</p>
				<span class="w-full border-t"></span>
				<p class="capitalize">
					<span class="font-bold">Weight:</span> {{ pokemonDetail.weight }}
				</p>
				<span class="w-full border-t"></span>
				<p class="capitalize">
					<span class="font-bold">Height:</span> {{ pokemonDetail.height }}
				</p>
				<span class="w-full border-t"></span>
				<div class="flex">
					<span class="font-bold">Types:&nbsp;</span>
					<p
						class="capitalize"
						v-for="types in pokemonDetail.types"
						:key="types"
					>
						{{ types.type.name }} &nbsp;
					</p>
				</div>
				<span class="w-full border-t"></span>
				<div class="flex justify-between gap-4 mt-[10px]">
					<Button
						activeBackground="bg-[#F22539] focus:bg-[#C00E20] active:bg-[#C00E20]"
						@click="
							copy(
								`Pokemon name: ${pokemonDetail.name.toUpperCase()}, Pokemon type/s: ${pokemonDetail.types
									.map((type) => type.type.name.toUpperCase())
									.join(' ')}`
							)
						"
						class="!max-w-[195px]"
					>
						{{ copied ? "Pokemon copied!" : "Share to my friends" }}
					</Button>
					<div
						class="inline-block rounded-full bg-slate-100 p-2 cursor-pointer"
						@click="addPkmnToFavorites(pokemonDetail.id)"
					>
						<Icon
							icon="material-symbols:kid-star"
							:color="pokemonDetail.favorite ? '#ECA539' : '#BFBFBF'"
							width="28"
							height="28"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import Button from "./Button.vue";
import { watch } from "vue";
import { storeToRefs } from "pinia";
import { Icon } from "@iconify/vue";
import { usePokemonStore } from "../store/store";
import { useClipboard } from "@vueuse/core";

const { copy, copied, isSupported } = useClipboard();

const store = usePokemonStore();
const { togglePokemonModal, pokemonDetail } = storeToRefs(store);
const { addPkmnToFavorites } = store;

watch(togglePokemonModal, (newValue) => {
	if (newValue) {
		document.body.classList.add("overflow-y-hidden");
	} else {
		document.body.classList.remove("overflow-y-hidden");
	}
});
</script>
<style scoped>
.pokemon-background {
	background: url("../assets/pokemonBackground.svg") bottom no-repeat;
}
</style>
