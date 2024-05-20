// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ['expo', 'prettier', 'plugin:import/recommended'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error',
  },
};
