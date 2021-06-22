const paths = require('./paths')
module.exports = {
  // 絶対パス。cssをインライン出力する場合のfontファイルのパス解決
  publicRootPath: "/",
  browserSync: {
    // https: true,
    port: 3010,
    // proxy: "http://localhost:3011",
    server: {
      baseDir: `${paths.public}`
    },
    open: true,
    notify: false,
    snippetOptions: {
      rule: {
        match: /<\/head>/i,
        fn: function (snippet, match) {
          return snippet + match
        },
      },
    },
    files: [
      `${paths.public}**/*.js`,
      `${paths.public}**/*.html`,
      `${paths.src}/**/*.js`,
    ],
  },
};
