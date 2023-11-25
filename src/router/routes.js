const routes = [
	{
		path: "/home",
		name: "Home",
		alias: ["/home", "/index", "/main"],
		meta: { requiresAuth: true },
		component: () => import("../views/HomeView.vue"),
	},
	{
		path: "/:id",
		name: "Details",
		meta: { requiresAuth: true },
		component: () => import("../views/DetailsView.vue"),
	},
	{
		path: "/favorites",
		name: "Favorites",
		meta: { requiresAuth: true },
		component: () => import("../views/FavoritesView.vue"),
	},
	{
		path: "/",
		name: "Start",
		component: () => import("../views/StartView.vue"),
	},
];
export default routes;
