const routes = [
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
];
export default routes;
