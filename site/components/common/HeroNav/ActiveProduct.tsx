import { Product } from '@commerce/types/product'
import s from './HeroNav.module.css'
import Image from 'next/future/image'
import Link from 'next/link'
import { Button } from '@components/ui'
import { Plus } from '@components/icons'

const placeholderImg = '/product-img-placeholder.svg'

export const ActiveProduct = ({ product }: { product: Product }) => {
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
        <span>{product.description}</span>
      </div>
    </div>
  )
}
