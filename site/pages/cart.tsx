import type { GetStaticPropsContext } from 'next'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { Button } from '@components/ui'
import {
  ArrowLong,
  Bag,
  Check,
  CreditCard,
  Cross,
  MapPin,
} from '@components/icons'
import { CartItem } from '@components/cart'
import { useUI } from '@components/ui/context'
import fashionOutlined from '../public/fashion3-outline-side.png'
import Image from 'next/future/image'
import s from '../components/product/ProductSidebar/ProductSidebar.module.css'
import Link from 'next/link'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  return {
    props: { pages, categories },
  }
}

export default function Cart() {
  const error = null
  const success = null
  const { data, isLoading, isEmpty } = useCart()
  const { openSidebar, setSidebarView } = useUI()

  const { price: subTotal } = usePrice(
    data && {
      amount: Number(data.subtotalPrice),
      currencyCode: data.currency.code,
    }
  )
  const { price: total } = usePrice(
    data && {
      amount: Number(data.totalPrice),
      currencyCode: data.currency.code,
    }
  )

  const goToCheckout = () => {
    openSidebar()
    setSidebarView('CHECKOUT_VIEW')
  }

  return (
    <div className="mx-auto px-6 max-w-7xl w-full pt-20 pb-16">
      <div className={s.sideLogo}>
        <Image src={fashionOutlined} alt="Fashion3" />
      </div>
      <Link href={'/'}>
        <a className="flex items-center text-4xl mb-6">
          <ArrowLong className="mr-2" />
          My Cart
        </a>
      </Link>
      <div className="grid lg:grid-cols-12 gap-20 z-10">
        <div className="lg:col-span-7">
          {isLoading || isEmpty ? (
            <div className="flex-1 px-12 py-24 flex flex-col justify-center items-center ">
              <span className="flex items-center justify-center w-16 h-16 bg-primary p-12 rounded-lg text-primary">
                <Bag className="absolute" />
              </span>
              <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
                Your cart is empty
              </h2>
            </div>
          ) : error ? (
            <div className="flex-1 px-4 flex flex-col justify-center items-center">
              <span className="border border-black rounded-full flex items-center justify-center w-16 h-16">
                <Cross width={24} height={24} />
              </span>
              <h2 className="pt-6 text-xl font-light text-center">
                We couldn’t process the purchase. Please check your card
                information and try again.
              </h2>
            </div>
          ) : success ? (
            <div className="flex-1 px-4 flex flex-col justify-center items-center">
              <span className="border border-black rounded-full flex items-center justify-center w-16 h-16">
                <Check />
              </span>
              <h2 className="pt-6 text-xl font-light text-center">
                Thank you for your order.
              </h2>
            </div>
          ) : (
            <div className="lg:px-0 sm:px-6 flex-1">
              <ul className="py-6 space-y-6 sm:py-0 sm:space-y-0 sm:divide-y sm:divide-black border-b border-black">
                {data!.lineItems.map((item: any) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    currencyCode={data?.currency.code!}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="lg:col-span-5">
          <div className="flex-shrink-0 ml-8 p-6 w-485 bg-fr-gray-62">
            {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED && (
              <>
                {/* Shipping Address */}
                {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
                <div className="rounded-md border border-black px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                  <div className="mr-5">
                    <MapPin />
                  </div>
                  <div className="text-sm text-center font-medium">
                    <span className="uppercase">+ Add Shipping Address</span>
                    {/* <span>
                    1046 Kearny Street.<br/>
                    San Franssisco, California
                  </span> */}
                  </div>
                </div>
                {/* Payment Method */}
                {/* Only available with customCheckout set to true - Meaning that the provider does offer checkout functionality. */}
                <div className="rounded-md border border-black px-6 py-6 mb-4 text-center flex items-center justify-center cursor-pointer hover:border-accent-4">
                  <div className="mr-5">
                    <CreditCard />
                  </div>
                  <div className="text-sm text-center font-medium">
                    <span className="uppercase">+ Add Payment Method</span>
                    {/* <span>VISA #### #### #### 2345</span> */}
                  </div>
                </div>
              </>
            )}
            <div>
              <ul className="pb-3">
                <li className="flex justify-between py-1">
                  <span className="text-f3-accent-11">Subtotal</span>
                  <span className="font-bold">{subTotal}</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="text-f3-accent-11">Taxes</span>
                  <span>Calculated at checkout</span>
                </li>
                <li className="flex justify-between py-1">
                  <span className="text-f3-accent-11">Shipping</span>
                  <span className="font-bold tracking-wide">FREE</span>
                </li>
              </ul>
              <div className="border-t border-black my-6"></div>
              <div className="flex justify-between py-3">
                <span className="text-f3-accent-11">Total</span>
                <span className="font-bold">{total}</span>
              </div>
            </div>
            <div className="flex flex-row justify-end pt-5">
              <div className="w-full">
                {isEmpty ? (
                  <Button href="/" Component="a" width="100%">
                    Continue Shopping
                  </Button>
                ) : (
                  <>
                    {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                      <Button Component="a" width="100%" onClick={goToCheckout}>
                        Proceed to Checkout ({total})
                      </Button>
                    ) : (
                      <Button
                        href="/checkout"
                        Component="a"
                        className={s.checkoutButton}
                      >
                        Checkout
                      </Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Cart.Layout = Layout
