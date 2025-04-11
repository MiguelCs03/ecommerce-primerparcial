/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        custom: ['"Playfair Display"', 'serif'],// Definir la fuente personalizada // Reemplaza con el nombre de la fuente
      },
    },
  },
  plugins: [],
}

