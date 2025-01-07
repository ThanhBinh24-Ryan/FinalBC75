const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   flowbite.content(),
  ],
  theme: {
    extend: { screens: {
      iphone: { max: '375px' }, // iPhone 6/7/8
      iphoneplus: { max: '414px' }, // iPhone 6/7/8 Plus
      ipad: '768px', // iPad
      desktop: '1200px', // Desktop
    },},
  },
  plugins: [
    flowbite.plugin(),
  ],
}