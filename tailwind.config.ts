import type { Config } from "tailwindcss";

export default {
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
        bg_gradient:
          "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, #EBE7E6, #EBE7E6)",
        text_heading: "#4A5A6B",
        text_primary: "#4A5A6B",
        bg_logo: "#B59656",
        btn_primary: "#B59656",
        btn_text_color: "#1E1E1E",
        btn_delete: "#EF3826",
        btn_secondary: "#F2F2F3",
      },
    },
  },
  plugins: [],
} satisfies Config;
