import React, { FC } from 'react'
import s from './Quantity.module.css'
import { Minus, Plus } from '@components/icons'
import cn from 'clsx'

export interface QuantityProps {
  value: number
  increase: () => any
  decrease: () => any
  handleRemove: React.MouseEventHandler<HTMLButtonElement>
  handleChange: React.ChangeEventHandler<HTMLInputElement>
  max?: number
}

const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  max = 6,
}) => {
  return (
    <div className="flex items-center h-9">
      <button
        type="button"
        onClick={decrease}
        className={s.actions}
        style={{ marginLeft: '-1px' }}
        disabled={value <= 1}
      >
        <Minus width={18} height={18} strokeWidth={2} />
      </button>
      <div className="px-2">{value}</div>
      <button
        type="button"
        onClick={increase}
        className={cn(s.actions)}
        style={{ marginLeft: '-1px' }}
        disabled={value < 1 || value >= max}
      >
        <Plus width={18} height={18} strokeWidth={2} />
      </button>

      {/* <button className={s.actions} onClick={handleRemove}>
        <Cross width={20} height={20} />
      </button> */}
      <button className="flex-1" onClick={handleRemove}>
        Remove
      </button>
    </div>
  )
}

export default Quantity
