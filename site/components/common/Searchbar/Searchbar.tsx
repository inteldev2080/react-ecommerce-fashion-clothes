import { FC, memo, useEffect, useRef } from 'react'
import cn from 'clsx'
import s from './Searchbar.module.css'
import { useRouter } from 'next/router'
import { Button } from '@components/ui'

interface Props {
  className?: string
  id?: string
}

const Searchbar: FC<Props> = ({ className, id = 'search' }) => {
  const router = useRouter()
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    router.prefetch('/search')
  }, [router])

  const onSubmit = (): void => {
    const q = input.current?.value

    router.push(
      {
        pathname: `/search`,
        query: q ? { q } : {},
      },
      undefined,
      { shallow: true }
    )
  }

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.preventDefault()

    if (e.key === 'Enter') {
      onSubmit()
    }
  }

  return (
    <div className={cn(s.root, className)}>
      <label className="hidden" htmlFor={id}>
        Search
      </label>
      <input
        ref={input}
        id={id}
        className={s.input}
        placeholder="Search"
        defaultValue={router.query.q}
        onKeyUp={handleKeyUp}
      />
      <Button type="button" onClick={onSubmit}>
        Search
      </Button>
    </div>
  )
}

export default memo(Searchbar)
