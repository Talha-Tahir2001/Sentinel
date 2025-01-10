// /** @type {import('tailwindcss').Config} */
// export const content = [
//   "./src/**/*.{html,ts}",
// ];
// export const theme = {
//   extend: {
//     animation: {
//       'float': 'float 6s ease-in-out infinite',
//     }, keyframes: {
//       float: {
//         '0%, 100%': { transform: 'translateY(0)' },
//         '50%': { transform: 'translateY(-20px)' },
//       }
//     }
//   },
// };
// export const plugins = [];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark"],
  },
}