/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            // Aquí definimos tu paleta de colores
            colors: {
                primary: "#0df259",         // Verde Neón
                "background-dark": "#102216", // Fondo muy oscuro (casi negro)
                "surface-dark": "#1a2e21",    // Fondo de la tarjeta
                "secondary-blue": "#1e3a8a",
            },
            fontFamily: {
                display: ["Lexend", "sans-serif"],
            }
        },
    },
    plugins: [],
}