import {nextui} from '@nextui-org/theme';
export default {
  plugins: [nextui()],
  content: [
    "./node_modules/@nextui-org/theme/dist/components/[object Object].js",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
     "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  "theme": {
    "extend": {
      "colors": {
        "primary": "#D5507C",
        "secondary": "#F4D0CB",
        "third": " #FF9045",
        "forth": " #786FA6",
        "five": "#95E3EB",
        "primaryFont": "#000000",
        "secondaryFont": "#ffffff"
      },
      "backgroundImage": {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  darkMode: "class",

  // Remove the duplicate "plugins" property
};