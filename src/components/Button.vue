<template>
	<button
		:class="`flex justify-center items-center min-w-[131px] max-h-[44px] px-[20px] py-[11px] gap-[10px] rounded-[60px] font-bold text-white ${props.activeBackground}`"
		@click="handleRouter"
	>
		<slot />
	</button>
</template>

<script setup>
import { useRouter } from "vue-router";
const props = defineProps({
	activeBackground: {
		type: String,
		default: "bg-red-500",
	},
	route: {
		type: String,
		default: "home",
	},
});
const router = useRouter();
const handleRouter = () => {
	router.push(`/${props.route}`);
};
</script>

<style scoped></style>
