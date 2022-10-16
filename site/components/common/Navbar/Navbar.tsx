import { FC } from 'react'
import Link from 'next/link'
import s from './Navbar.module.css'
import NavbarRoot from './NavbarRoot'
import { Container, Logo } from '@components/ui'
import { Searchbar, UserNav } from '@components/common'
import { motion } from 'framer-motion'

interface Link {
  href: string
  label: string
}

interface NavbarProps {
  links?: Link[]
  className?: string
}

const Navbar: FC<NavbarProps> = ({ links, className = '' }) => (
  <NavbarRoot className={className}>
    <Container clean className="mx-auto max-w-8xl px-8">
      <motion.div className={s.nav} layoutId="navbar">
        <div className="flex items-center flex-1">
          <Link href="/">
            <a className={s.logo} aria-label="Logo">
              <Logo />
            </a>
          </Link>
        </div>
        {process.env.COMMERCE_SEARCH_ENABLED && (
          <div className="justify-center flex-1 hidden lg:flex">
            <Searchbar />
          </div>
        )}
        <div className="flex items-center justify-end flex-1 space-x-8">
          <UserNav />
        </div>
      </motion.div>
      {process.env.COMMERCE_SEARCH_ENABLED && (
        <div className="flex pb-4 lg:px-6 lg:hidden">
          <Searchbar id="mobile-search" />
        </div>
      )}
    </Container>
  </NavbarRoot>
)

export default Navbar
