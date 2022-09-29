import { Product } from '@commerce/types/product'
import s from './HeroNav.module.css'
import { Navbar } from '@components/common'
import cn from 'clsx'
import { useState } from 'react'
import Image from 'next/future/image'
import { Button } from '@components/ui'
import Link from 'next/link'

const placeholderImg = '/product-img-placeholder.svg'

const ActiveProduct = ({ product }: { product: Product }) => {
  return (
    <div className={s.activeProduct}>
      <Image
        quality="85"
        src={product.images[0]?.url || placeholderImg}
        alt={product.name || 'Product Image'}
        width={340}
        height={340}
        className={s.activeImage}
      />
      <Link href={`/product/${product.slug}`}>
        <Button Component={'a'} className={s.productLink}>
          <span>
            <span className={s.unit}>Unit</span>+ {product.name}
          </span>
          <span>View Product</span>
        </Button>
      </Link>
      <div className={s.desc}>
        <span>{product.description}</span>
      </div>
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
          src="/fashion3-outline.png"
          width={701}
          height={171}
          className={s.fashionImage}
          alt="Fashion3"
        />
        <Image
          src="/fw2022-hero.png"
          width={923}
          height={877}
          className={s.heroImage}
          alt="FW2022"
        />
      </div>
    </div>
  )
}

export default HeroNav
