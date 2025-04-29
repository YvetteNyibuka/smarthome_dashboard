import type { Config } from "tailwindcss";

export default {
  // Removed invalid 'font' property
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/antd/dist/antd.min.css",
  ],
  theme: {
    extend: {
      colors: {
        bg_primary: " #106BB9",
        text_color: " #1E1E1E",
        secondary: "#6ACFF5",
      },
    },
  },
  plugins: [],
} satisfies Config;
