import cn from 'clsx'
import React, {
  ButtonHTMLAttributes,
  forwardRef,
  JSXElementConstructor,
  useRef,
} from 'react'
import { mergeRefs } from 'react-merge-refs'
import s from './Button.module.css'
import { LoadingDots } from '@components/ui'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  className?: string
  variant?: 'flat' | 'slim' | 'ghost' | 'naked' | 'naked-ls'
  active?: boolean
  type?: 'submit' | 'reset' | 'button'
  Component?: string | JSXElementConstructor<any>
  width?: string | number
  loading?: boolean
  disabled?: boolean
  inverted?: boolean
}

// eslint-disable-next-line react/display-name
const Button: React.FC<ButtonProps> = forwardRef((props, buttonRef) => {
  const {
    className,
    variant = 'flat',
    children,
    active,
    width,
    loading = false,
    disabled = false,
    inverted = false,
    style = {},
    Component = 'button',
    ...rest
  } = props
  const ref = useRef<typeof Component>(null)
  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === 'ghost',
      [s.slim]: variant === 'slim',
      [s.naked]: variant === 'naked',
      [s.nakedLeftSide]: variant === 'naked-ls',
      [s.loading]: loading,
      [s.disabled]: disabled,
      [s.inverted]: inverted,
      [s.active]: active,
    },
    className
  )

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      ref={mergeRefs([ref, buttonRef])}
      className={rootClassName}
      disabled={disabled}
      style={{
        width,
        ...style,
      }}
      {...rest}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  )
})

export default Button
