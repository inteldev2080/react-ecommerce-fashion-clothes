import { FC, useEffect } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { Page } from '@commerce/types/page'
import getSlug from '@lib/get-slug'
import { Github, Vercel } from '@components/icons'
import { Container, Logo } from '@components/ui'
import { I18nWidget } from '@components/common'
import ICON_F_1 from '../../../public/icon_f_1.png';
import ICON_F_2 from '../../../public/icon_f_2.png';
import ICON_F_3 from '../../../public/icon_f_3.png';
import ICON_F_I_1 from '../../../public/icon_f_i_1.png';
import ICON_F_T_2 from '../../../public/icon_f_t_2.png';
import ICON_F_D_3 from '../../../public/icon_f_d_3.png';
import s from './Footer.module.css'
import Image from 'next/image'

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const links = [
  {
    name: 'Home',
    url: '/',
  },
]

const Footer: FC<Props> = ({ className, pages }) => {
  const { pathname } = useRouter();
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  useEffect(() => {
  }, [pathname]);

  return (
    <footer className={rootClassName}>
      <Container>
        {pathname === '/' && (
          <>
            <div className="mt-14 w-full md:w-[60%]">
              <p className="leading-7">"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
              <p className="mt-14 leading-8">
                All contents of this website are the property of fashioncubed LLC. No part of this site, including all text and images, may be reproduced in any form without the prior written consent of fashioncubed LLC.
              </p>
              <p className="mt-11">
                Independently owned and operated.
              </p>
              <p className="mt-8">
                7014 13th avenue suite 202, Brooklyn, NY, United States, 11228
              </p>
              <p className="mt-8">
                Our inquiry email address is hello@fashion3.io
              </p>
            </div>
            <div className="mt-16 w-40 flex items-center justify-between">
              <Image src={ICON_F_1} alt="ICON_F_1" />
              <Image src={ICON_F_2} alt="ICON_F_2" />
            </div>
          </>
        )}
        <div className="mt-12 flex flex-wrap items-start justify-center lg:justify-between md:justify-center">
          <div className="lg:flex-1 mt-5 sm:ml-[50px] md:ml-0">
            <div>
              <Image src={ICON_F_3} alt='ICON_F_3' />
            </div>
            <div className="mt-14 ml-8 flex items-center gap-[2rem]">
              <a href="">
                <Image src={ICON_F_I_1} alt='ICON_F_I_1' />
              </a>
              <a href="">
                <Image src={ICON_F_T_2} alt='ICON_F_T_2' />
              </a>
              <a href="">
                <Image src={ICON_F_D_3} alt='ICON_F_D_3' />
              </a>
            </div>
          </div>
          <div className="mt-5 ml-12">
            <h3 className="text-lg">LEGAL TERMS AND CONDITIONS</h3>
            <div className={`${s.onHoverLT} flex flex-col gap-8 text-sm`}>
              <a className="mt-8" href="">Legal Notice</a>
              <a href="">Privacy Policy</a>
              <a href="">Cookie Policy</a>
            </div>
          </div>
          <div className="mt-5 ml-12 md:mr-56">
            <h3 className="text-lg">COMPANY INFO</h3>
            <div className={`${s.onHoverCP} flex flex-col gap-8 text-sm`}>
              <a className="mt-8" href="">Shipping</a>
              <a href="">Sizing</a>
              <a href="">Repairs</a>
            </div>
          </div>
        </div>









        {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 transition-colors duration-150">
          <div className="col-span-1 lg:col-span-2">
            <Link href="/">
              <a className="flex flex-initial items-center font-bold md:mr-24">
                <span className="rounded-full border border-accent-6 mr-2">
                  <Logo />
                </span>
                <span>ACME</span>
              </a>
            </Link>
          </div>
          <div className="col-span-1 lg:col-span-8">
            <div className="grid md:grid-rows-4 md:grid-cols-3 md:grid-flow-col">
              {[...links, ...sitePages].map((page) => (
                <span key={page.url} className="py-3 md:py-0 md:pb-4">
                  <Link href={page.url!}>
                    <a className="hover:text-accent-6 transition ease-in-out duration-150">
                      {page.name}
                    </a>
                  </Link>
                </span>
              ))}
            </div>
          </div>
          <div className="col-span-1 lg:col-span-2 flex items-start lg:justify-end">
            <div className="flex space-x-6 items-center h-10">
              <a
                className={s.link}
                aria-label="Github Repository"
                href="https://github.com/vercel/commerce"
              >
                <Github />
              </a>
              <I18nWidget />
            </div>
          </div>
        </div> */}
        <div className="mt-[50px] pb-[30px] text-sm">
          <div>
            <span>Copyright © 2022 | All Rights Reserved.</span>
          </div>
          {/* <div className="flex items-center text-sm">
            <span>Created by</span>
            <a
              rel="noopener noreferrer"
              href="https://vercel.com"
              aria-label="Vercel.com Link"
              target="_blank"
            >
              <Vercel className="inline-block h-6 ml-3" alt="Vercel.com Logo" />
            </a>
          </div> */}
        </div>
      </Container>
    </footer>
  )
}

function usePages(pages?: Page[]) {
  const { locale } = useRouter()
  const sitePages: Page[] = []

  if (pages) {
    pages.forEach((page) => {
      const slug = page.url && getSlug(page.url)
      if (!slug) return
      if (locale && !slug.startsWith(`${locale}/`)) return
      sitePages.push(page)
    })
  }

  return {
    sitePages: sitePages.sort(bySortOrder),
  }
}

// Sort pages by the sort order assigned in the BC dashboard
function bySortOrder(a: Page, b: Page) {
  return (a.sort_order ?? 0) - (b.sort_order ?? 0)
}

export default Footer
