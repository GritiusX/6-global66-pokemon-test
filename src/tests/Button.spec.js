import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import Button from "../components/Button.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: "/home",
			name: "Home",
			alias: ["/home", "/index", "/main"],
			component: () => import("../views/HomeView.vue"),
		},
		{
			path: "/favorites",
			name: "Favorites",
			component: () => import("../views/FavoritesView.vue"),
		},
		{
			path: "/",
			name: "Start",
			component: () => import("../views/StartView.vue"),
		},
	],
});

describe("Button", () => {
	it("renders properly with using a Slot", () => {
		const wrapper = mount(Button, {
			props: { activeBackground: "bg-red-500", disabled: false },
			slots: { default: "Get Started" },
			global: {
				plugins: [router],
			},
		});

		expect(wrapper.text()).toBe("Get Started");
		expect(wrapper.attributes("disabled")).toBe("false");
		expect(wrapper.classes()).toContain("bg-red-500");
	});
});
