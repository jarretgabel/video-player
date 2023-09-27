import gsap from 'gsap'

class ESPNVideoPlayer {
  constructor(vp) {
    this.video = vp
    this.container = vp.closest('.vp__container')
    this.id = this.video.dataset.id

    this.resizeHandler()
    this.events()
    // this.build()
  }

  events() {
    gsap.ticker.add(this.tickHandler)
    window.addEventListener('resize', this.resizeHandler)
    this.container.addEventListener('click', this.build)
    document.addEventListener('ESPN:VP:DESTROY', this.destroy)
  }

  build = () => {
    console.log(this.id)

    document.dispatchEvent(new Event('ESPN:VP:DESTROY'))

    this.container.removeEventListener('click', this.build)

    window.espn.video.play(this.id, {
      autoplay: true,
      platform: Modernizr.touch ? 'mobile' : 'desktop',
      targetReplaceId: `vp-${this.id}`,
    })
  }

  destroy = () => {
    window.espn.video.remove(this.id)
  }

  tickHandler = () => {
    this.espnVideo = document.querySelector('.evp-player')
    if (this.espnVideo) {
      this.resizeHandler()
    }
  }

  resizeHandler = () => {
    this.screen = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    if (this.espnVideo) {
      const height = this.espnVideo.offsetHeight

      if (height !== this.height) {
        gsap.set([this.container, this.video], { height })
        this.height = height
      }
    }
  }

}

export default ESPNVideoPlayer