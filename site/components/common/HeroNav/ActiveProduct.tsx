import { Product } from '@commerce/types/product'
import s from './HeroNav.module.css'
import Link from 'next/link'
import Image from 'next/future/image'
import { Button } from '@components/ui'
import { Plus } from '@components/icons'
import dynamic from 'next/dynamic'
import { SyntheticEvent, useState } from 'react'
import cn from 'clsx'
import { motion } from 'framer-motion'
import ErrorBoundary from '@components/common/ErrorBoundary'

const Glitch = dynamic(() => import('@components/common/Glitch'), {
  ssr: false,
})

const placeholderImg = '/product-img-placeholder.svg'

export const ActiveProduct = ({
  product,
}: {
  product: Product
  key: string
}) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [nextUrl, setNextUrl] = useState<string>()

  const onLoad = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    const sources = e.currentTarget.srcset
      .split(',')
      .map((s) => s.trim().split(' '))
    const source2x = sources.find((s) => s[1] === '2x')
    if (source2x) {
      setNextUrl(source2x[0])
    }
  }

  return (
    <div className={cn(s.activeProduct, { [s.loaded]: isLoaded })}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={s.activeImage}
      >
        <Image
          quality="85"
          src={product.images[0]?.url || placeholderImg}
          alt={product.name || 'Product Image'}
          width={240}
          height={360}
          onLoad={onLoad}
        />
        <ErrorBoundary>
          {nextUrl && (
            <Glitch
              src={product.images[0]?.url || placeholderImg}
              onLoad={() => setIsLoaded(true)}
            />
          )}
        </ErrorBoundary>
      </motion.div>
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
      >
        <Link href={`/product/${product.slug}`}>
          <Button Component={'a'} className={s.productLink} inverted>
            <div>
              <div className={s.unit}>Unit</div>
              <div className={s.name}>
                <Plus />
                {product.name}
              </div>
            </div>
            <div>View Product</div>
          </Button>
        </Link>
        <div className={s.desc}>
          <span>{product.short_description?.value}</span>
        </div>
      </motion.div>
    </div>
  )
}
