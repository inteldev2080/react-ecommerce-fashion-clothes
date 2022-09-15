import s from './ProductSidebar.module.css'
import { useAddItem } from '@framework/cart'
import { FC, useEffect, useState } from 'react'
import { ProductOptions } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Collapse, Text, useUI } from '@components/ui'
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
  SelectedOptions,
} from '../helpers'
import ProductTag from '@components/product/ProductTag'
import usePrice from '@framework/product/use-price'
import Image from 'next/image'
import ICON_P_1 from '../../../public/icon_P_1.png'

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

  return (
    <div className="flex" >
      <div className="mt-[45px]">
        <Image src={ICON_P_1} alt="ICON_P_1" />
      </div >

      {/* <div className={className}> */}

      <div className="basis-2/4 mx-auto lg:px-[0px] px-[15px]">
        <ProductTag
          name={product.name}
          price={`${price} ${product.price?.currencyCode}`}
          fontSize={32}
        />

        <div className="mt-[24px] flex justify-between">
          <div className="bg-black px-[16px] py-[8px] text-white">TypeWR</div>
          <div className="bg-black px-[16px] py-[8px] text-white">Gen!</div>
          <div className="bg-black px-[16px] py-[8px] text-white">Lightshellstyle</div>
          <div className="bg-black px-[16px] py-[8px] text-white">Lightshellstyle</div>
        </div>

        <div className="mt-[80px]">
          <div className="flex items-center gap-[13px]">
            <h3 className="text-[24px] font-[400]">Description</h3>
            <div className="w-[10px] h-[10px] bg-black"></div>
          </div>
          {/* <Text
            className="leading-[205%] pb-4 break-words w-full max-w-xl"
            html='The ultimate in DFMA contour fit. Featuring a fully 3-dimensional cut, ǍCROŇYMř signature X-back yoke, and sleeve anchor loops with a watch access zip, J97 is an ergonomic second skin. Light enough to feel like a shirt, yet resistant enough to platform like a jacket, it rides the multi-season line between inner (winter) and outer (summer) layer.'
          /> */}
          <div className={`${s.description} leading-[205%] mt-[12px] break-words w-[477px] max-h-[198px] overflow-scroll`}>The ultimate in DFMA contour fit. Featuring a fully 3-dimensional cut, ǍCROŇYMř signature X-back yoke, and sleeve anchor loops with a watch access zip, J97 is an ergonomic second skin. Light enough to feel like a shirt, yet resistant enough to platform like a jacket, it rides the multi-season line between inner (winter) and outer (summer) layer.
          </div>
        </div>
        <div className="mt-[48px]">
          <div className="flex items-center gap-[13px]">
            <h3 className="text-[24px] font-[400]">Size</h3>
            <div className="w-[10px] h-[10px] bg-black"></div>
          </div>
          <ProductOptions
            options={product.options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        </div>
        <div className="mt-[50px]">
          {process.env.COMMERCE_CART_ENABLED && (
            <Button
              aria-label="Add to Cart"
              type="button"
              className={s.button}
              onClick={addToCart}
              loading={loading}
              disabled={variant?.availableForSale === false}
            >
              {variant?.availableForSale === false
                ? 'Not Available'
                : 'Add To Cart'}
            </Button>
          )}
        </div>
        <div className="mt-[40px]">
          <Collapse title="Size Guide">
            This is a limited edition production run. Printing starts when the
            drop ends.
          </Collapse>
          <Collapse title="Fabric Technology">
            This is a limited edition production run. Printing starts when the
            drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
            to COVID-19.
          </Collapse>
          <Collapse title="Subsytems">
            This is a limited edition production run. Printing starts when the
            drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
            to COVID-19.
          </Collapse>
          <Collapse title="Shipping & Returns">
            This is a limited edition production run. Printing starts when the
            drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
            to COVID-19.
          </Collapse>
          <Collapse title="Includes">
            This is a limited edition production run. Printing starts when the
            drop ends. Reminder: Bad Boys For Life. Shipping may take 10+ days due
            to COVID-19.
          </Collapse>
        </div>
      </div>
    </div>
  )
}

export default ProductSidebar
