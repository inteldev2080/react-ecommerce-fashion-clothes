import Image from 'next/future/image'
import s from './ProductView.module.css'
import { FC } from 'react'
import type { Product } from '@commerce/types/product'
import { WishlistButton } from '@components/wishlist'
import { Container } from '@components/ui'
import { SEO } from '@components/common'
import ProductSidebar from '../ProductSidebar'
import fashionOutlinedBottom from '../../../public/fashion3-bottom.png'

interface ProductViewProps {
  product: Product
  relatedProducts: Product[]
}

const ProductView: FC<ProductViewProps> = ({ product, relatedProducts }) => {
  return (
    <>
      <Container className="max-w-none w-full" clean>
        <div className={s.containerInner}>
          <ProductSidebar
            key={product.id}
            product={product}
            className={s.sidebar}
          />
          <div className={s.rightColumn}>
            <div className={s.imageContainer}>
              {product.images.map((image, i) => (
                <Image
                  key={image.url}
                  className={s.img}
                  src={image.url!}
                  alt={image.alt || 'Product Image'}
                  width={600}
                  height={600}
                  priority={i === 0}
                  quality="85"
                />
              ))}
            </div>

            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
          </div>
        </div>
      </Container>
      <Image
        src={fashionOutlinedBottom}
        className={s.fashion3BottomRight}
        alt="Fashion3"
      />
      <SEO
        title={product.name}
        description={product.description}
        openGraph={{
          type: 'website',
          title: product.name,
          description: product.description,
          images: [
            {
              url: product.images[0]?.url!,
              width: '800',
              height: '600',
              alt: product.name,
            },
          ],
        }}
      />
    </>
  )
}

export default ProductView
