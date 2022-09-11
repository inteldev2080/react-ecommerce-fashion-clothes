import { Product } from '@commerce/types/product'
import s from './HeroNav.module.css'
import { Navbar } from '@components/common'
import cn from 'clsx'
import { useState } from 'react'
import Image from 'next/image'

const placeholderImg = '/product-img-placeholder.svg'

const ActiveProduct = ({ product }: { product: Product }) => {
  return (
    <div>
      <Image
        quality="85"
        src={product.images[0]?.url || placeholderImg}
        alt={product.name || 'Product Image'}
        height={320}
        width={320}
        layout="fixed"
      />
    </div>
  )
}

interface Props {
  products: Product[]
}

const HeroNav = ({ products }: Props): JSX.Element => {
  const [active, setActive] = useState<string>()

  const activeProduct = products.find((product) => product.id === active)
  console.log(activeProduct)

  return (
    <div className={s.root}>
      <Navbar className={s.nav} />
      <nav className={s.sidebar}>
        {products.map((product) => (
          <button
            key={product.id}
            className={cn(s.button, { [s.active]: product.id === active })}
            type="button"
            onClick={() => setActive(product.id)}
          >
            {product.name}
          </button>
        ))}
      </nav>
      <div className={s.main}>
        {activeProduct && <ActiveProduct product={activeProduct} />}
        <Image
          src="/hero.png"
          layout="fill"
          objectFit="contain"
          objectPosition="right"
        />
      </div>
    </div>
  )
}

export default HeroNav
