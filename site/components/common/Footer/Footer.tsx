import { FC } from 'react'
import cn from 'clsx'
import type { Page } from '@commerce/types/page'
import { Container } from '@components/ui'
import fashionLogo from '../../../public/icon_f_3.png'
import instagram from '../../../public/icon_f_i_1.png'
import twitter from '../../../public/icon_f_t_2.png'
import discord from '../../../public/icon_f_d_3.png'
import s from './Footer.module.css'
import Image from 'next/image'
import getSlug from '@lib/get-slug'
import { useRouter } from 'next/router'
import Link from 'next/link'

type LinkSection = {
  title: string
  links: {
    name: string
    url: string
  }[]
}

const links: LinkSection[] = [
  {
    title: 'Legal Terms and Conditions',
    links: [
      { name: 'Legal Notice', url: '/terms-and-conditions' },
      { name: 'Privacy Policy', url: '/privacy-policy' },
      { name: 'Cookie Policy', url: '/cookie-policy' },
    ],
  },
  {
    title: 'Company Info',
    links: [
      { name: 'Shipping', url: '/' },
      { name: 'Sizing', url: '/' },
      { name: 'Repairs', url: '/repairs' },
    ],
  },
]

interface Props {
  className?: string
  children?: any
  pages?: Page[]
}

const Footer: FC<Props> = ({ className, pages }) => {
  const { sitePages } = usePages(pages)
  const rootClassName = cn(s.root, className)

  return (
    <footer className={rootClassName}>
      <Container>
        <div className="flex flex-wrap items-start justify-center lg:justify-between md:justify-center">
          <div className="lg:flex-1 sm:mx-auto md:mx-0 mb-5 md:mb-0">
            <div>
              <Image src={fashionLogo} alt="fashion3" />
            </div>
            <div className="mt-14 ml-8 flex items-center gap-[2rem]">
              <a href="">
                <Image src={instagram} alt="instagram" />
              </a>
              <a href="">
                <Image src={twitter} alt="twitter" />
              </a>
              <a href="">
                <Image src={discord} alt="discord" />
              </a>
            </div>
          </div>
          <div className={s.linksContainer}>
            {links.map((section) => (
              <div key={section.title}>
                <h3 className="text-lg uppercase">{section.title}</h3>
                <div className={s.list}>
                  {section.links.map((link) => (
                    <Link href={link.url} key={link.name}>
                      <a>{link.name}</a>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-8 text-sm">
          Copyright © {new Date().getFullYear()} | All Rights Reserved.
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
