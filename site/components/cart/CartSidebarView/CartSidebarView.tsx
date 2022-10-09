import cn from 'clsx'
import Link from 'next/link'
import { FC } from 'react'
import s from './CartSidebarView.module.css'
import CartItem from '../CartItem'
import { Button } from '@components/ui'
import { useUI } from '@components/ui/context'
import { Bag, Check, Cross } from '@components/icons'
import useCart from '@framework/cart/use-cart'
import usePrice from '@framework/product/use-price'
import SidebarLayout from '@components/common/SidebarLayout'

const CartSidebarView: FC = () => {
  const { closeSidebar, setSidebarView } = useUI()
  const { data, isLoading, isEmpty } = useCart()

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
  const handleClose = () => closeSidebar()
  const goToCheckout = () => setSidebarView('CHECKOUT_VIEW')

  const error = null
  const success = null

  return (
    <SidebarLayout
      className={cn({
        [s.empty]: error || success || isLoading || isEmpty,
      })}
      handleClose={handleClose}
    >
      {isLoading || isEmpty ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="rounded-full flex items-center justify-center w-16 h-16 p-12 bg-secondary text-secondary">
            <Bag className="absolute" />
          </span>
          <h2 className="pt-6 text-2xl font-bold tracking-wide text-center">
            Your cart is empty
          </h2>
        </div>
      ) : error ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Cross width={24} height={24} />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            We couldn’t process the purchase. Please check your card information
            and try again.
          </h2>
        </div>
      ) : success ? (
        <div className="flex-1 px-4 flex flex-col justify-center items-center">
          <span className="border border-white rounded-full flex items-center justify-center w-16 h-16">
            <Check />
          </span>
          <h2 className="pt-6 text-xl font-light text-center">
            Thank you for your order.
          </h2>
        </div>
      ) : (
        <>
          <div className="px-4 sm:px-6 flex-1">
            <ul className={s.lineItemsList}>
              {data!.lineItems.map((item: any) => (
                <CartItem
                  key={item.id}
                  item={item}
                  currencyCode={data!.currency.code}
                />
              ))}
            </ul>
          </div>

          <div className="flex-shrink-0 py-8 sticky z-20 bottom-0 mx-6 right-0 left-0 bg-accent-0 border-t border-black text-sm">
            <ul className="pb-8">
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
            <div className="flex justify-between border-t border-black pt-8 pb-6 mb-2">
              <span className="text-f3-accent-11">Total</span>
              <span className="font-bold">{total}</span>
            </div>
            <div>
              {process.env.COMMERCE_CUSTOMCHECKOUT_ENABLED ? (
                <Button
                  Component="a"
                  className="w-full h-12 text-xl"
                  onClick={goToCheckout}
                >
                  Proceed to Checkout ({total})
                </Button>
              ) : (
                <Link href="/cart">
                  <Button
                    Component="a"
                    onClick={handleClose}
                    className="w-full h-12 text-xl"
                  >
                    Checkout
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </>
      )}
    </SidebarLayout>
  )
}

export default CartSidebarView
