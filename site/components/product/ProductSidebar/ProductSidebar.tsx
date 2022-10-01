import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ProductTag from '@components/product/ProductTag'
import usePrice from '@framework/product/use-price'
import Image from 'next/image'
import fashionOutlined from '../../../public/icon_P_1.png'
import { Plus } from '@components/icons'

interface ProductSidebarProps {
  product: Product
  className?: string
}

const ProductSidebar: FC<ProductSidebarProps> = ({ product, className }) => {
  const addItem = useAddItem()
  const { openSidebar, setSidebarView } = useUI()
  const [loading, setLoading] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({})

  useEffect(() => {
    console.log(product)
    selectDefaultOptionFromProduct(product, setSelectedOptions)
  }, [product])

  const variant = getProductVariant(product, selectedOptions)
  const addToCart = async () => {
    setLoading(true)
    try {
      await addItem({
        productId: String(product.id),
        variantId: String(variant ? variant.id : product.variants[0]?.id),
      })
      setSidebarView('CART_VIEW')
      openSidebar()
      setLoading(false)
    } catch (err) {
      setLoading(false)
    }
  }

  const { price } = usePrice({
    amount: product.price.value,
    baseAmount: product.price.retailPrice,
    currencyCode: product.price.currencyCode!,
  })

  return (
    <div className="flex w-full">
      <div className={s.mainLogo}>
        <Image src={fashionOutlined} alt="ICON_P_1" />
      </div>

      {/* <div className={className}> */}

      <div className="basis-2/4 mx-auto px-4 lg:px-0">
        <ProductTag
          name={product.name}
          price={`${price} ${product.price?.currencyCode}`}
          fontSize={32}
        />

        <div className="mt-6 flex gap-4">
          {product.tags?.map((item: any, index: number) => {
            return (
              <div key={index} className={s.productTags}>
                {item}
              </div>
            )
          })}
        </div>

        <div className="mt-20">
          <div className="flex items-center">
            <h3 className={s.heading}>Description</h3>
          </div>
          <div className={s.description}>{product.description}</div>
        </div>
        <div className="mt-12">
          <div className="flex items-center">
            <h3 className={s.heading}>Size</h3>
          </div>
          <ProductOptions
            options={product.options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>
        <div className="mt-12">
          {process.env.COMMERCE_CART_ENABLED && (
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
              disabled={variant?.availableForSale === false}
            >
              {variant?.availableForSale === false ? (
                'Not Available'
              ) : (
                <>
                  <Plus className="mr-4" />
                  Add To Cart
                </>
              )}
            </Button>
          )}
        </div>
        {product.size_guide && (
          <div className="mt-14">
            <div className="flex items-center">
              <h3 className={s.heading}>Size Guide</h3>
            </div>
            <div className="mt-12 w-60">{product.size_guide.value}</div>
          </div>
        )}
        {product.fabric && (
          <div className="mt-14 w-60">
            <div className="flex items-center">
              <h3 className={s.heading}>Fabric Technology</h3>
            </div>
            <div className="mt-12">{product.fabric.value}</div>
          </div>
        )}
        {product.subsystems && (
          <div className="mt-14 w-60">
            <div className="flex items-center">
              <h3 className={s.heading}>Subsytems</h3>
            </div>
            <div className="mt-12">{product.subsystems.value}</div>
          </div>
        )}
        <div className="mt-14 w-60">
          <div className="flex items-center">
            <h3 className={s.heading}>Shipping & Returns</h3>
          </div>
          <div className="mt-12">
            READY TO SHIP. PRODUCTS ARE LIMITED STOCK. ALL SALES ARE FINAL.
          </div>
        </div>
        {product.includes && (
          <div className="mt-14">
            <div className="flex items-center">
              <h3 className={s.heading}>Includes</h3>
            </div>
            <div className="mt-12 w-60">{product.includes.value}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductSidebar
