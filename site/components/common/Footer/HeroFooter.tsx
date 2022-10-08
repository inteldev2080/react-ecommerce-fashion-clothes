import { Container } from '@components/ui'
import Image from 'next/image'
import ultra from '../../../public/ultra.png'
import nft from '../../../public/nft.png'
import s from './Footer.module.css'
import { Email } from '@components/common/Link'

const HeroFooter = () => {
  return (
    <footer className={s.heroFooter}>
      <Container>
        <div className="md:w-3/5">
          <p className="leading-7">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum."
          </p>
          <p className="mt-14 leading-8">
            All contents of this website are the property of fashioncubed LLC.
            No part of this site, including all text and images, may be
            reproduced in any form without the prior written consent of
            fashioncubed LLC.
          </p>
          <p className="mt-11">Independently owned and operated.</p>
          <p className="mt-8">
            7014 13th avenue suite 202, Brooklyn, NY, United States, 11228
          </p>
          <p className="mt-8">
            Our inquiry email address is <Email>hello@fashion3.io</Email>
          </p>
        </div>
        <div className="mt-16 w-40 flex items-center justify-between">
          <Image src={ultra} alt="ultra" />
          <Image src={nft} alt="nft" />
        </div>
      </Container>
    </footer>
  )
}

export { HeroFooter }
