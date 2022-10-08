import { FC } from 'react'
import cn from 'clsx'
import type { Page } from '@commerce/types/page'
import { Container } from '@components/ui'
import fashionLogo from '../../../public/fashion3-filled.png'
import s from './Footer.module.css'
import Image from 'next/image'
import getSlug from '@lib/get-slug'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BlankLink } from '@components/common/Link'
import { Discord, Instagram, Twitter } from '@components/icons'

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
      { name: 'Legal Notice', url: '/legal/terms-and-conditions' },
      { name: 'Privacy Policy', url: '/legal/privacy-policy' },
      { name: 'Cookie Policy', url: '/legal/cookie-policy' },
    ],
  },
  {
    title: 'Company Info',
    links: [
      { name: 'Shipping', url: '/' },
      { name: 'Sizing', url: '/' },
      { name: 'Repairs', url: '/legal/repairs' },
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
              <Image src={fashionLogo} alt="fashion3" quality={100} />
            </div>
            <div className="mt-14 ml-8 flex items-center gap-[2rem]">
              <BlankLink href="">
                <Instagram />
              </BlankLink>
              <BlankLink href="https://twitter.com/fashion3_">
                <Twitter />
              </BlankLink>
              <BlankLink href="https://discord.com/invite/9qtGAZBpc7">
                <Discord />
              </BlankLink>
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
