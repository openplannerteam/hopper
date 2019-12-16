/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable global-require */
// PostCSS-Loader config options
module.exports = {
  plugins: [
    require('autoprefixer'),
    // eslint-disable-next-line import/no-unresolved
    require('postcss-csso')({ restructure: false }),
  ],
};
