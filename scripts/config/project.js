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
  },
  // https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/automating-image-optimization/
  imagemin: {
    highQualityJpeg: {
      glob: [],
      options: {
        progressive: true,
        sample: ["2x2"],
        quality: 95
      }
    },
    mozjpeg: {
      progressive: true,
      sample: ["2x2"],
      quality: 75
    },
    pngquant: {
      quality: [0.7, 0.8]
    },
    svgo: {
      removeViewBox: false
    }
  }
};
