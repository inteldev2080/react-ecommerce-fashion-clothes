import Sketch, { SketchProps } from 'react-p5'
import { draw, preload, setup } from './sketch'
import { Glitcher } from '@components/common/Glitch/glitcher'

const Glitch = ({
  src,
  onLoad,
  ...props
}: Omit<SketchProps, 'preload' | 'setup' | 'draw'> & {
  src: string
  onLoad?: (glitcher: Glitcher) => void
}): JSX.Element => {
  return (
    <Sketch
      {...props}
      preload={preload(src)}
      setup={setup}
      draw={draw(onLoad)}
    />
  )
}

export default Glitch
