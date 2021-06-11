const timelinePromise = (timeline) => {
  return new Promise(resolve => {
    timeline.eventCallback("onComplete", function () {
      resolve(timeline)
    })
    timeline.play()
  })
}

const domLoaded = () => new Promise(resolve => {
  if (document.readyState !== "loading") {
    setTimeout(() => resolve(), 0)
    return
  }
  window.addEventListener('load', function () {
    resolve()
  })
  document.addEventListener('DOMContentLoaded', function () {
    resolve()
  })
})

export {
  domLoaded,
  timelinePromise,
}
