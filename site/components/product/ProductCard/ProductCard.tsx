import { FC } from 'react'
import cn from 'clsx'
import Link from 'next/link'
import type { Product } from '@commerce/types/product'
import s from './ProductCard.module.css'
import Image, { ImageProps } from 'next/future/image'
import WishlistButton from '@components/wishlist/WishlistButton'
import usePrice from '@framework/product/use-price'
import ProductTag from '../ProductTag'

interface Props {
  className?: string
  product: Product
  noNameTag?: boolean
  imgProps?: Omit<ImageProps, 'src' | 'layout' | 'placeholder' | 'blurDataURL'>
  variant?: 'default' | 'slim' | 'simple'
}

const placeholderImg = '/product-img-placeholder.svg'

const ProductCard: FC<Props> = ({
  product,
  imgProps,
  className,
  noNameTag = false,
  variant = 'default',
}) => {
  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  const rootClassName = cn(
    s.root,
    { [s.slim]: variant === 'slim', [s.simple]: variant === 'simple' },
    className
  )

  return (
    <Link href={`/product/${product.slug}`}>
      <a className={rootClassName} aria-label={product.name}>
        {variant === 'slim' && (
          <>
            <div className={s.header}>
              <span>{product.name}</span>
            </div>
            {product?.images && (
              <div>
                <Image
                  quality="85"
                  src={product.images[0]?.url || placeholderImg}
                  alt={product.name || 'Product Image'}
                  height={320}
                  width={320}
                  {...imgProps}
                />
              </div>
            )}
          </>
        )}

        {variant === 'simple' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0]}
              />
            )}
            {!noNameTag && (
              <div className={s.header}>
                <h3 className={s.name}>{product.name}</h3>
              </div>
            )}
            <div>
              <div className={s.imageContainer}>
                {product?.images && (
                  <div>
                    <Image
                      alt={product.name || 'Product Image'}
                      className={s.productImage}
                      src={product.images[0]?.url || placeholderImg}
                      height={540}
                      width={540}
                      quality="85"
                      {...imgProps}
                    />
                  </div>
                )}
              </div>
              <div className={s.price}>{price}</div>
            </div>
          </>
        )}

        {variant === 'default' && (
          <>
            {process.env.COMMERCE_WISHLIST_ENABLED && (
              <WishlistButton
                className={s.wishlistButton}
                productId={product.id}
                variant={product.variants[0] as any}
              />
            )}
            <div className={s.imageContainer}>
              {product?.images && (
                <div>
                  <Image
                    alt={product.name || 'Product Image'}
                    className={s.productImage}
                    src={product.images[0]?.url || placeholderImg}
                    height={540}
                    width={540}
                    quality="85"
                    {...imgProps}
                  />
                </div>
              )}
            </div>
            <ProductTag
              name={product.name}
              price={`${price} ${product.price?.currencyCode}`}
            />
          </>
        )}
      </a>
    </Link>
  )
}

export default ProductCard
