import { ChangeEvent, useEffect, useState } from 'react'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import s from './CartItem.module.css'
import { useUI } from '@components/ui/context'
import type { LineItem } from '@commerce/types/cart'
import usePrice from '@framework/product/use-price'
import useUpdateItem from '@framework/cart/use-update-item'
import useRemoveItem from '@framework/cart/use-remove-item'
import Quantity from '@components/ui/Quantity'

type ItemOption = {
  name: string
  nameId: number
  value: string
  valueId: number
}

const placeholderImg = '/product-img-placeholder.svg'

const CartItem = ({
  item,
  variant = 'default',
  currencyCode,
  ...rest
}: {
  variant?: 'default' | 'display'
  item: LineItem
  currencyCode: string
}) => {
  const { closeSidebarIfPresent } = useUI()
  const [removing, setRemoving] = useState(false)
  const [quantity, setQuantity] = useState<number>(item.quantity)
  const removeItem = useRemoveItem()
  const updateItem = useUpdateItem({ item })

  const { price } = usePrice({
    amount: item.variant.price * item.quantity,
    baseAmount: item.variant.listPrice * item.quantity,
    currencyCode,
  })

  const handleChange = async ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    setQuantity(Number(value))
    await updateItem({ quantity: Number(value) })
  }

  const increaseQuantity = async (n = 1) => {
    const val = Number(quantity) + n
    setQuantity(val)
    await updateItem({ quantity: val })
  }

  const handleRemove = async () => {
    setRemoving(true)
    try {
      await removeItem(item)
    } catch (error) {
      setRemoving(false)
    }
  }

  // TODO: Add a type for this
  const options = (item as any).options

  useEffect(() => {
    // Reset the quantity state if the item quantity changes
    if (item.quantity !== Number(quantity)) {
      setQuantity(item.quantity)
    }
    // TODO: currently not including quantity in deps is intended, but we should
    // do this differently as it could break easily
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.quantity])

  return (
    <li
      className={cn(s.root, {
        'opacity-50 pointer-events-none': removing,
      })}
      {...rest}
    >
      <div className="flex flex-row space-x-6 py-4">
        {/* <div className="w-28 h-16 bg-violet relative overflow-hidden cursor-pointer z-0"> */}
        <div>
          <Link href={`/product/${item.path}`}>
            <a>
              <Image
                onClick={() => closeSidebarIfPresent()}
                className={s.productImage}
                width={140}
                height={200}
                src={item.variant.image?.url || placeholderImg}
                alt={item.variant.image?.altText || 'Product Image'}
                unoptimized
              />
            </a>
          </Link>
        </div>
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <Link href={`/product/${item.path}`}>
              <a>
                <span
                  className={s.productName}
                  onClick={() => closeSidebarIfPresent()}
                >
                  {item.name}
                </span>
              </a>
            </Link>
            <div>{price}</div>
          </div>
          <p className="text-sm">3L Gore-Tex Pro Jacket</p>
          {options && options.length > 0 && (
            <div className="flex items-center pb-1 mt-1.5">
              {options.map((option: ItemOption, i: number) => (
                <div
                  key={`${item.id}-${option.name}`}
                  className="text-sm text-accent-7 inline-flex items-center justify-center"
                >
                  {option.name}:
                  {option.name === 'Color' ? (
                    <span
                      className="mx-1 rounded-full bg-transparent w-5 h-5 p-1 text-accent-9 inline-flex items-center justify-center overflow-hidden"
                      style={{
                        backgroundColor: `${option.value}`,
                      }}
                    ></span>
                  ) : (
                    <span className="mx-1 rounded-full bg-transparent h-5 inline-flex items-center justify-center">
                      {option.value}
                    </span>
                  )}
                  {i === options.length - 1 ? '' : <span className="mr-3" />}
                </div>
              ))}
            </div>
          )}
          <div className="mt-8">
            {variant === 'default' && (
              <Quantity
                value={quantity}
                handleRemove={handleRemove}
                handleChange={handleChange}
                increase={() => increaseQuantity(1)}
                decrease={() => increaseQuantity(-1)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col justify-between space-y-2 border-r-2 border-black"></div>
      </div>
    </li>
  )
}

export default CartItem
