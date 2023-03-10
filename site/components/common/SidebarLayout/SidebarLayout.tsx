import React, { FC } from 'react'
import { ChevronLeft, Cross } from '@components/icons'
import cn from 'clsx'
import s from './SidebarLayout.module.css'

type ComponentProps = { className?: string; children?: React.ReactNode } & (
  | { handleClose: () => any; handleBack?: never }
  | { handleBack: () => any; handleClose?: never }
)

const SidebarLayout: FC<ComponentProps> = ({
  children,
  className,
  handleBack,
  handleClose,
}) => {
  return (
    <div className={cn(s.root, className)}>
      <header className={s.header}>
        <div className="text-36xl">Cart</div>
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <div>
              <Cross className="p-2 h-9 w-9 bg-f3-accent-10 hover:text-accent-3" />
            </div>
            {/* <span className="ml-2 text-accent-7 text-sm ">Close</span> */}
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <ChevronLeft className="h-6 w-6 hover:text-accent-3" />
            <span className="ml-2 text-accent-7 text-xs">Back</span>
          </button>
        )}
      </header>
      <div className={s.container}>{children}</div>
    </div>
  )
}

export default SidebarLayout
