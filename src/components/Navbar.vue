<template>
	<nav
		class="flex w-full justify-center items-center shadow-top bg-white fixed bottom-0 h-[80px] gap-[15px] z-1"
	>
		<Button
			:activeBackground="
				route.name === 'Home'
					? 'bg-[#F22539] focus:bg-[#C00E20] active:bg-[#C00E20]'
					: 'bg-[#BFBFBF]'
			"
		>
			<Icon icon="ion:list-sharp" color="white" width="28" height="28" />
			All
		</Button>
		<Button
			route="favorites"
			:activeBackground="
				route.name === 'Favorites'
					? 'bg-[#F22539] focus:bg-[#C00E20] active:bg-[#C00E20]'
					: 'bg-[#BFBFBF]'
			"
		>
			<Icon icon="mingcute:star-fill" color="white" width="28" height="28" />
			Favorites
		</Button>
	</nav>
</template>

<script setup>
import { useRoute } from "vue-router";
import { Icon } from "@iconify/vue";
import Button from "./Button.vue";
const route = useRoute();
</script>

<style scoped></style>
