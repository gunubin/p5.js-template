const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// FIXME: 階層化するか検討
module.exports = {
  src: resolveApp('src'),
  build: resolveApp('public/assets'),
  sass: resolveApp('src/assets/sass'),
  mainSass: resolveApp('src/assets/sass/styles.scss'),
  css: resolveApp('public/assets/css'),
  imageSrc: resolveApp('src/assets/images'),
  image: resolveApp('public/assets/images'),
  js: {
    index: resolveApp('src/assets/js/index.js'),
    loader: resolveApp('src/assets/js/loader.js'),
    build: resolveApp('public/assets/js')
  },
  public: resolveApp('public'),
  html: resolveApp('public/index.html')
};
