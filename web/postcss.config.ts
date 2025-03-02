export default {
  plugins: {
    'postcss-preset-env': {
      stage: 1,
      features: {
        'logical-properties-and-values': true,
      }
    },
    autoprefixer: {}
  }
}