const path = require('path')
const project = require('./config/project')
const paths = require('./config/paths')
const imagemin = require('imagemin')
const imageminJpegtran = require('imagemin-jpegtran')
const imageminPngquant = require('imagemin-pngquant')
const imageminMozjpeg = require('imagemin-mozjpeg')
const imageminSvgo = require('imagemin-svgo')
const glob = require('glob')
const fs = require('fs-extra')

const { imagemin: imageminOptions } = project
const { highQualityJpeg } = imageminOptions
const { glob: highQualityFiles } = highQualityJpeg

// FIXME: imageminがディレクトリ構造を維持したまま実行できないので
glob(
  `${paths.imageSrc}/**/*.{jpg,jpeg,png,svg,json}`,
  {
    nodir: true,
    ignore: highQualityFiles,
  },
  (er, files) => {
    er && console.log(er)
    files.map(file => {
      doMin(file)
    })
  },
)

highQualityFiles.map(i => {
  glob(
    i,
    {
      nodir: true,
    },
    (er, files) => {
      er && console.log(er)
      files.map(file => {
        doMin(file, true)
        // const dir = path.dirname(file).replace(paths.imageSrc, '')
        // const filename = path.basename(file)
        // fs.copySync(file, `${paths.image}${dir}/${filename}`)
      })
    },
  )
})

async function doMin(file, highQualityJpeg = false) {
  // imagemin([`${paths.imageSrc}/**/*.{jpg,jpeg,png,svg}`], `${paths.image}`, {
  const dir = path.dirname(file).replace(paths.imageSrc, '')
  await imagemin([file], {
    destination: `${paths.image}${dir}`,
    plugins: [
      // imageminJpegtran(project.imagemin.jpegtran), // progressiveの方が僅かに小さい
      imageminMozjpeg(
        highQualityJpeg
          ? imageminOptions.highQualityJpeg.options
          : imageminOptions.mozjpeg,
      ),
      imageminPngquant(imageminOptions.pngquant),
      imageminSvgo(imageminOptions.svgo),
    ],
  })
}
