/** @type {import("tailwindcss").Config} */
module.exports = {
    darkMode: "selector",
    content: ["./dev/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
    plugins: [require("tailwindcss-animate")],
    presets: [],
};
