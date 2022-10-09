import { Product } from '@commerce/types/product'
import s from './HeroNav.module.css'
import { Navbar } from '@components/common'
import cn from 'clsx'
import { Fragment, useState } from 'react'
import Image from 'next/future/image'
import { ActiveProduct } from '@components/common/HeroNav/ActiveProduct'
import Link from 'next/link'
import { Plus } from '@components/icons'
import f3Outline from '../../../public/fashion3-bottom-left.png'
import fw2022Hero from '../../../public/fw2022-hero.png'

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

const repeat = <T,>(arr: T[], n: number): T[] => Array(n).fill(arr).flat()

const HeroNav = ({ products }: Props): JSX.Element => {
  const [activeId, setActiveId] = useState<string>()

  const activeProduct = products.find((product) => product.id === activeId)

  const onProductClick = (
    { currentTarget }: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    product: Product
  ) => {
    setActiveId(product.id)
    const parent = currentTarget.parentElement!.parentElement!
    const top =
      currentTarget.offsetTop -
      parent.offsetTop -
      (parent.offsetHeight - currentTarget.offsetHeight) / 2
    parent.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <div className={s.root}>
      <Navbar className={s.nav} />
      <div className={s.side}>
        <div className={s.sidebarOuter}>
          <nav className={s.sidebar}>
            {repeat<Product>(products, 1).map((product) => (
              <button
                key={product.id}
                className={cn(s.button, {
                  [s.active]: product.id === activeId,
                })}
                type="button"
                onClick={(e) => onProductClick(e, product)}
              >
                {product.name}
              </button>
            ))}
          </nav>
        </div>
        <VerticalNav items={verticalItems} />
      </div>
      <div className={s.main}>
        {activeProduct && (
          <ActiveProduct product={activeProduct} key={activeProduct.id} />
        )}
        <Image
          src={f3Outline}
          className={s.fashionImage}
          width={701}
          alt="Fashion3"
        />
        <Image src={fw2022Hero} className={s.heroImage} alt="FW2022" />
      </div>
    </div>
  )
}

export default HeroNav
