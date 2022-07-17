/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./resources/views/**/*.edge'],
  theme: {
    colors: ({ colors }) => ({
      'primary': colors.purple[500],
      'background': colors.gray[800],
      'surface': colors.gray[900],
      'inactive': colors.gray[400],
      'placeholder': colors.gray[400],
      'primary-text': colors.gray[50],
    }),
  },
  plugins: [],
}
