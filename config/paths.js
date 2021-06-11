const fs = require('fs');
const path = require('path');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// FIXME: 階層化するか検討
module.exports = {
  build: resolveApp('public/assets'),
  src: resolveApp('src'),
  js: {
    index: resolveApp('src/assets/js/index.js'),
    build: resolveApp('public/assets/js')
  },
  public: resolveApp('public'),
  html: resolveApp('public/index.html')
};
