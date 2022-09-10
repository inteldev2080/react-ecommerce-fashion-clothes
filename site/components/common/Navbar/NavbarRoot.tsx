import React, { useEffect, useState } from 'react'
import throttle from 'lodash.throttle'
import cn from 'clsx'
import s from './Navbar.module.css'

interface Props {
  className?: string
  children: React.ReactNode
}

const NavbarRoot = ({ children, className }: Props): JSX.Element => {
  const [hasScrolled, setHasScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = throttle(() => {
      const offset = 0
      const { scrollTop } = document.documentElement
      const scrolled = scrollTop > offset

      if (hasScrolled !== scrolled) {
        setHasScrolled(scrolled)
      }
    }, 200)

    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [hasScrolled])

  return (
    <div className={cn(s.root, { 'shadow-magical': hasScrolled }, className)}>
      {children}
    </div>
  )
}

export default NavbarRoot
