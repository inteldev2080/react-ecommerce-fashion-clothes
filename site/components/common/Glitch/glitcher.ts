import p5Types from 'p5'

export class Glitcher {
  private _p5: p5Types
  private paused: boolean = false
  private channelLen: number = 4
  private imgOrigin: p5Types.Image
  private copyData: Uint8ClampedArray
  private flowLineImgs: any[] = []
  private shiftLineImgs: any[] = []
  private shiftRGBs: any[] = []
  private scatImgs: any[] = []
  private throughFlag: boolean

  constructor(img: p5Types.Image, p5: p5Types) {
    this._p5 = p5
    this.imgOrigin = img
    this.imgOrigin.loadPixels()
    this.throughFlag = true
    this.copyData = new Uint8ClampedArray(this.imgOrigin.pixels)

    // flow line
    for (let i = 0; i < 1; i++) {
      let o = {
        pixels: null,
        t1: this._p5.floor(this._p5.random(0, 1000)),
        speed: this._p5.floor(this._p5.random(4, 24)),
        randX: this._p5.floor(this._p5.random(24, 80)),
      }
      this.flowLineImgs.push(o)
    }

    // shift line
    for (let i = 0; i < 6; i++) {
      let o = null
      this.shiftLineImgs.push(o)
    }

    // shift RGB
    for (let i = 0; i < 1; i++) {
      let o = null
      this.shiftRGBs.push(o)
    }

    // scat imgs
    for (let i = 0; i < 3; i++) {
      let scatImg = {
        img: null,
        x: 0,
        y: 0,
      }
      this.scatImgs.push(scatImg)
    }
  }

  pause() {
    this.paused = true
  }

  play() {
    this.paused = false
  }

  show() {
    // restore the original state
    this.replaceData(this.imgOrigin, this.copyData)

    if (this.paused) return

    // sometimes pass without effect processing
    let n = this._p5.floor(this._p5.random(100))
    if (n > 75 && this.throughFlag) {
      this.throughFlag = false
      setTimeout(() => {
        this.throughFlag = true
      }, this._p5.floor(this._p5.random(40, 400)))
    }
    if (!this.throughFlag) {
      this._p5.push()
      this._p5.translate(
        (this._p5.width - this.imgOrigin.width) / 2,
        (this._p5.height - this.imgOrigin.height) / 2
      )
      this._p5.image(this.imgOrigin, 0, 0)
      this._p5.pop()
      return
    }

    // flow line
    this.flowLineImgs.forEach((v, i, arr) => {
      arr[i].pixels = this.flowLine(this.imgOrigin, v)
      if (arr[i].pixels) {
        this.replaceData(this.imgOrigin, arr[i].pixels)
      }
    })

    // shift line
    this.shiftLineImgs.forEach((v, i, arr) => {
      if (this._p5.floor(this._p5.random(100)) > 50) {
        arr[i] = this.shiftLine(this.imgOrigin)
        this.replaceData(this.imgOrigin, arr[i])
      } else {
        if (arr[i]) {
          this.replaceData(this.imgOrigin, arr[i])
        }
      }
    })

    // shift rgb
    this.shiftRGBs.forEach((v, i, arr) => {
      if (this._p5.floor(this._p5.random(100)) > 65) {
        arr[i] = this.shiftRGB(this.imgOrigin)
        this.replaceData(this.imgOrigin, arr[i])
      }
    })

    this._p5.push()
    this._p5.translate(
      (this._p5.width - this.imgOrigin.width) / 2,
      (this._p5.height - this.imgOrigin.height) / 2
    )
    this._p5.image(this.imgOrigin, 0, 0)
    this._p5.pop()

    // scat image
    this.scatImgs.forEach((obj) => {
      this._p5.push()
      this._p5.translate(
        (this._p5.width - this.imgOrigin.width) / 2,
        (this._p5.height - this.imgOrigin.height) / 2
      )
      if (this._p5.floor(this._p5.random(100)) > 80) {
        obj.x = this._p5.floor(
          this._p5.random(
            -this.imgOrigin.width * 0.3,
            this.imgOrigin.width * 0.7
          )
        )
        obj.y = this._p5.floor(
          this._p5.random(-this.imgOrigin.height * 0.1, this.imgOrigin.height)
        )
        obj.img = this.getRandomRectImg(this.imgOrigin)
      }
      if (obj.img) {
        this._p5.image(obj.img, obj.x, obj.y)
      }
      this._p5.pop()
    })
  }

  private replaceData(destImg: p5Types.Image, srcPixels: any) {
    for (let y = 0; y < destImg.height; y++) {
      for (let x = 0; x < destImg.width; x++) {
        let r, g, b, a
        let index
        index = (y * destImg.width + x) * this.channelLen
        r = index
        g = index + 1
        b = index + 2
        a = index + 3
        destImg.pixels[r] = srcPixels[r]
        destImg.pixels[g] = srcPixels[g]
        destImg.pixels[b] = srcPixels[b]
        destImg.pixels[a] = srcPixels[a]
      }
    }
    destImg.updatePixels()
  }

  private flowLine(srcImg: p5Types.Image, obj: any) {
    let destPixels, tempY
    destPixels = new Uint8ClampedArray(srcImg.pixels)
    obj.t1 %= srcImg.height
    obj.t1 += obj.speed
    //tempY = floor(noise(obj.t1) * srcImg.height);
    tempY = this._p5.floor(obj.t1)
    for (let y = 0; y < srcImg.height; y++) {
      if (tempY === y) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a
          let index
          index = (y * srcImg.width + x) * this.channelLen
          r = index
          g = index + 1
          b = index + 2
          a = index + 3
          destPixels[r] = srcImg.pixels[r] + obj.randX
          destPixels[g] = srcImg.pixels[g] + obj.randX
          destPixels[b] = srcImg.pixels[b] + obj.randX
          destPixels[a] = srcImg.pixels[a]
        }
      }
    }
    return destPixels
  }

  private shiftLine(srcImg: p5Types.Image) {
    let offsetX
    let rangeMin, rangeMax
    let destPixels
    let rangeH

    destPixels = new Uint8ClampedArray(srcImg.pixels)
    rangeH = srcImg.height
    rangeMin = this._p5.floor(this._p5.random(0, rangeH))
    rangeMax = rangeMin + this._p5.floor(this._p5.random(1, rangeH - rangeMin))
    offsetX = this.channelLen * this._p5.floor(this._p5.random(-40, 40))

    for (let y = 0; y < srcImg.height; y++) {
      if (y > rangeMin && y < rangeMax) {
        for (let x = 0; x < srcImg.width; x++) {
          let r, g, b, a
          let r2, g2, b2, a2
          let index

          index = (y * srcImg.width + x) * this.channelLen
          r = index
          g = index + 1
          b = index + 2
          a = index + 3
          r2 = r + offsetX
          g2 = g + offsetX
          b2 = b + offsetX
          destPixels[r] = srcImg.pixels[r2]
          destPixels[g] = srcImg.pixels[g2]
          destPixels[b] = srcImg.pixels[b2]
          destPixels[a] = srcImg.pixels[a]
        }
      }
    }
    return destPixels
  }

  private shiftRGB(srcImg: p5Types.Image) {
    let randR, randG, randB
    let destPixels
    let range

    range = 16
    destPixels = new Uint8ClampedArray(srcImg.pixels)
    randR =
      (this._p5.floor(this._p5.random(-range, range)) * srcImg.width +
        this._p5.floor(this._p5.random(-range, range))) *
      this.channelLen
    randG =
      (this._p5.floor(this._p5.random(-range, range)) * srcImg.width +
        this._p5.floor(this._p5.random(-range, range))) *
      this.channelLen
    randB =
      (this._p5.floor(this._p5.random(-range, range)) * srcImg.width +
        this._p5.floor(this._p5.random(-range, range))) *
      this.channelLen

    for (let y = 0; y < srcImg.height; y++) {
      for (let x = 0; x < srcImg.width; x++) {
        let r, g, b, a
        let r2, g2, b2, a2
        let index

        index = (y * srcImg.width + x) * this.channelLen
        r = index
        g = index + 1
        b = index + 2
        a = index + 3
        r2 = (r + randR) % srcImg.pixels.length
        g2 = (g + randG) % srcImg.pixels.length
        b2 = (b + randB) % srcImg.pixels.length
        destPixels[r] = srcImg.pixels[r2]
        destPixels[g] = srcImg.pixels[g2]
        destPixels[b] = srcImg.pixels[b2]
        destPixels[a] = srcImg.pixels[a]
      }
    }

    return destPixels
  }

  private getRandomRectImg(srcImg: p5Types.Image) {
    let startX
    let startY
    let rectW
    let rectH
    let destImg
    startX = this._p5.floor(this._p5.random(0, srcImg.width - 30))
    startY = this._p5.floor(this._p5.random(0, srcImg.height - 50))
    rectW = this._p5.floor(this._p5.random(30, srcImg.width - startX))
    rectH = this._p5.floor(this._p5.random(1, 50))
    destImg = srcImg.get(startX, startY, rectW, rectH)
    destImg.loadPixels()
    return destImg
  }
}
