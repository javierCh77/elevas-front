/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Asegura que los colores sean hexadecimales y no usen `oklch`
        primary: "#AEA344",
        secondary: "#8C8631",
        fondo: "#F8F8EE",
        borde: "#DEDFA9",
        texto: "#4B4B3D",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
  },
  corePlugins: {
    preflight: true, // mantener estilos base
  },
  plugins: [],
};
