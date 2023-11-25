/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			spacing: {
				16.5: "70px",
			},
			margin: {
				16.5: "70px",
			},
			padding: {
				16.5: "70px",
			},
			fontSize: {
				"2.5xl": "26px",
			},
			lineHeight: {
				pokemon: "31.2px",
				inputPlaceholder: "22.4px",
			},
			boxShadow: {
				top: "0px -17px 22px -13px rgba(0,0,0,0.1)",
			},
		},
		screens: {
			xs: "375px",
			xs2: "400px",
			sm: "640px",
			md: "768px",
			lg: "1024px",
			lg2: "1100px",
			xl: "1280px",
			"2xl": "1536px",
		},
	},
	plugins: [],
};
