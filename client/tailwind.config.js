/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      height: {
        '450': '600px',
      },
      top: {
        '20p': '20%',
      },
    },
    fontFamily: {
      josefin: ["Josefin Sans"],
      lora: ["Lora"],
      varela: ["Varela"],
      signature: ["Fredericka the Great"]

    }
  },
  plugins: [],
}

