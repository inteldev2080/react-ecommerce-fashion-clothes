import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'

import React, { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'
import { AnimatePresence } from 'framer-motion'

const Noop = ({ children }: { children?: React.ReactNode }): JSX.Element => (
  <>{children}</>
)

export default function MyApp({ Component, pageProps }: AppProps) {
  const Layout = (Component as any).Layout || Noop

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      <Head />
      <ManagedUIContext>
        <AnimatePresence
          exitBeforeEnter
          initial={false}
          onExitComplete={() => window.scrollTo(0, 0)}
        >
          <Layout pageProps={pageProps}>
            <Component {...pageProps} />
          </Layout>
        </AnimatePresence>
      </ManagedUIContext>
    </>
  )
}
