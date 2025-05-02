// This file tells Tailwind how to generate the utility classes (configuration and customization)


/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./views/**/*.ejs",      
    ],
    theme: {
      extend: {
        colors: {
        'main_background_color': '#e3ceb9',
        'nav_background_color': '#9f7756',    
        },
        fontFamily: {
          sans: ['Inter', 'sans-serif'],  // exemple de police
        },
      },
    },
    plugins: [],
  }
  