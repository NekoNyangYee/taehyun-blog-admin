import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			width: {
				profileImage: "var(--width-profile-image)",
			},
			height: {
				profileImage: "var(--height-profile-image)",
			},
			backgroundColor: {
				kakao: "var(--background-color-kakaologin)",
				google: "var(--background-color-googlelogin)",
				navButton: "var(--background-color-nav-button)",
			},
			borderColor: {
				containerColor: "var(--border-color-container)",
				logoutColor: "var(--border-color-logout)",
			},
			borderRadius: {
				button: "var(--radius-button)",
				container: "var(--radius-container)",
			},
			padding: {
				button: "var(--padding-button)",
				container: "var(--padding-container)",
			},
			fontSize: {
				mainTitle: "var(--text-size-main-title)",
				containerTitle: "var(--text-size-container-title)",
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
