/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "index.html",
    "./src/**/*.js"
  ],
  theme: { 
    container: { center: true, padding: "1rem"},
    screens: { sm: "480px", md: "768px", lg: "1024px", xl: "1280px" },
    extend: {
      spacing: { 18: "4.5rem" },
      fontSize: {
        fluid: ["clamp(1rem, 2.5vw + .5rem, 1.25rem)", { lineHeight: "1.5" }]
      }
    } 
},
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
  ],
}
