import { Product } from '@commerce/types/product'
import s from './HeroNav.module.css'
import Link from 'next/link'
import Image from 'next/future/image'
import { Button } from '@components/ui'
import { Plus } from '@components/icons'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import cn from 'clsx'
import { motion } from 'framer-motion'

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

  return (
    <motion.div
      className={cn(s.activeProduct, { [s.loaded]: isLoaded })}
      initial={{ y: 200, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className={s.activeImage}>
        <Image
          quality="85"
          src={product.images[0]?.url || placeholderImg}
          alt={product.name || 'Product Image'}
          width={240}
          height={360}
        />
        <Glitch
          src={product.images[0]?.url || placeholderImg}
          onLoad={() => setIsLoaded(true)}
          key={product.id}
        />
      </div>
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
  )
}
