module.exports = {
  plugins: [
    require('autoprefixer')({ remove: false }),
    require('postcss-css-variables')({
      preserve: true
    })
  ]
}
