import ESPNVideoPlayer from './components/ESPNVideoPlayer'

window.ESPN = window.ESPN || {}

class App {
  constructor() {

    const vps = document.querySelectorAll('.vp')
    vps.forEach(vp => {
      new ESPNVideoPlayer(vp)
    })

  }
}

window.onunload = () => {
  window.scrollTo(0, 0)
}

document.addEventListener('DOMContentLoaded', (event) => {
  if (document.fonts) {
    document.fonts.ready.then(() => {
      window.ESPN.App = new App()
    })
  } else {
    window.ESPN.App = new App()
  }
})