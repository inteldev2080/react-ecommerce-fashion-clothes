import { Product } from '@commerce/types/product'
import s from './HeroNav.module.css'
import { Navbar } from '@components/common'
import cn from 'clsx'
import { Fragment, useState } from 'react'
import Image from 'next/future/image'
import { ActiveProduct } from '@components/common/HeroNav/ActiveProduct'
import Link from 'next/link'
import { Plus } from '@components/icons'

interface VerticalItem {
  name: string
  url: string
}

const VerticalNav = ({ items }: { items: VerticalItem[] }): JSX.Element => {
  return (
    <nav className={s.verticalNav}>
      {items.map((category, i) => (
        <Fragment key={category.name}>
          <Link href={category.url}>
            <a>{category.name}</a>
          </Link>
          {i < items.length - 1 && (
            <Plus width={30} height={30} strokeWidth={2} />
          )}
        </Fragment>
      ))}
    </nav>
  )
}

interface Props {
  products: Product[]
}

const verticalItems = [
  { name: 'Men', url: '/search?q=men' },
  { name: 'Women', url: '/search?q=women' },
  { name: 'Unisex', url: '/search?q=unisex' },
  { name: 'Grid view', url: '/search' },
]

const HeroNav = ({ products }: Props): JSX.Element => {
  const [activeId, setActiveId] = useState<string>()

  const activeProduct = products.find((product) => product.id === activeId)

  return (
    <div className={s.root}>
      <Navbar className={s.nav} />
      <div className={s.side}>
        <nav className={s.sidebar}>
          {products.map((product) => (
            <button
              key={product.id}
              className={cn(s.button, { [s.active]: product.id === activeId })}
              type="button"
              onClick={() => setActiveId(product.id)}
            >
              {product.name}
            </button>
          ))}
        </nav>
        <VerticalNav items={verticalItems} />
      </div>
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
