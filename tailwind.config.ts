import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/antd/dist/antd.min.css",
  ],
  theme: {
    extend: {
      colors: {
        main: "#2793D0",
        cycle: "#BA0C2F",
      },
    },
  },
  plugins: [],
} satisfies Config;
