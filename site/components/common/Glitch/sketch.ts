import { Glitcher } from './glitcher'
import p5Types from 'p5'

let glitcher: Glitcher
let img: p5Types.Image

const preload = (src: string) => (p5: p5Types) => {
  img = p5.loadImage(src)
}

const setup = (p5: p5Types, canvasParentRef: Element) => {
  img.resize(0, 720)
  p5.createCanvas(img.width, img.height).parent(canvasParentRef)
  glitcher = new Glitcher(img, p5)
}

const draw = (onLoad?: (glitcher: Glitcher) => void) => (p5: p5Types) => {
  p5.clear()
  p5.background(255)
  if (glitcher) {
    glitcher.show()
    onLoad?.(glitcher)
  }
}

export { preload, setup, draw }
