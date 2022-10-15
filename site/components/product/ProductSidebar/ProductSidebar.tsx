import { FC, useEffect, useMemo, useState } from 'react'
import { parse } from 'csv-parse/sync'
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
import fashionOutlined from '../../../public/fashion3-outline-side.png'
import Image from 'next/future/image'
import { Plus } from '@components/icons'
import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import Table from '@components/common/Table'

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

  const sizingGuide = useMemo<null | string | string[][]>(() => {
    if (!product.size_guide?.value) return null
    try {
      return parse(product.size_guide?.value, {
        skip_empty_lines: true,
      })
    } catch (err) {
      console.log(err)
    }
    return product.size_guide?.value
  }, [product.size_guide?.value])

  return (
    <div className="flex w-full">
      <Image src={fashionOutlined} className={s.sideLogo} alt="Fashion3" />

      <div className="basis-2/4 mx-auto px-4 lg:px-0">
        <ProductTag name={product.name} price={price} fontSize={32} />

        <div className="mt-6 flex gap-4">
          {product.tags?.map((item: any, index: number) => {
            return (
              <div key={index} className={s.productTags}>
                {item}
              </div>
            )
          })}
        </div>

        <div className="mt-16">
          <div className="flex items-center">
            <h3 className={s.heading}>Description</h3>
          </div>
          <div
            className={s.description}
            dangerouslySetInnerHTML={{
              __html: product.descriptionHtml ?? product.description,
            }}
          />
        </div>
        {product.options.length > 0 && (
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
        )}
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
        <div className={s.meta}>
          {sizingGuide && (
            <div>
              <h3 className={s.heading}>Size Guide</h3>
              <div>
                {typeof sizingGuide === 'string' ? (
                  sizingGuide
                ) : (
                  <Table columns={sizingGuide} />
                )}
              </div>
            </div>
          )}
          {product.fabric && (
            <div>
              <h3 className={s.heading}>Fabric Technology</h3>
              <div>{product.fabric.value}</div>
            </div>
          )}
          {product.subsystems && (
            <div>
              <h3 className={s.heading}>Subsytems</h3>
              <div>{product.subsystems.value}</div>
            </div>
          )}
          <div>
            <h3 className={s.heading}>Shipping & Returns</h3>
            <div>
              READY TO SHIP. PRODUCTS ARE LIMITED STOCK. ALL SALES ARE FINAL.
            </div>
          </div>
          {product.includes && (
            <div>
              <h3 className={s.heading}>Includes</h3>
              <div>{product.includes.value}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductSidebar
