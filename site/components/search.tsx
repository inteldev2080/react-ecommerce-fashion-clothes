import cn from 'clsx'
import type { SearchPropsType } from '@lib/search-props'
import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'

import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import type { Product } from '@commerce/types/product'
import { Button, Skeleton } from '@components/ui'

import useSearch from '@framework/product/use-search'

import getSlug from '@lib/get-slug'
import rangeMap from '@lib/range-map'
import { filterQuery, useSearchMeta } from '@lib/search'
import Image from 'next/future/image'
import fashionOutlinedBottom from '../public/fashion3-bottom.png'
import fashionOutlined from '../public/fashion3-outline-side.png'
import s from '@components/product/ProductView/ProductView.module.css'
import ps from '../components/product/ProductSidebar/ProductSidebar.module.css'
import { ArrowLong } from '@components/icons'

enum SORT {
  season = 'Season',
  categories = 'Categories',
  featured = 'Featured',
}

type SortBy = SORT | null

type ProductGroup = {
  name?: string
  products: Product[]
}

export default function Search({ categories, brands }: SearchPropsType) {
  const [activeFilter, setActiveFilter] = useState<SortBy>(null)
  const [toggleFilter, setToggleFilter] = useState(false)

  const router = useRouter()
  const { asPath, locale } = router
  const { q, sort } = router.query
  // `q` can be included but because categories and designers can't be searched
  // in the same way of products, it's better to ignore the search input if one
  // of those is selected
  const query = filterQuery({ sort })

  const { pathname, category, brand } = useSearchMeta(asPath)
  const activeCategory = categories.find((cat: any) => cat.slug === category)
  const activeBrand = brands.find(
    (b: any) => getSlug(b.node.path) === `brands/${brand}`
  )?.node

  const { data } = useSearch({
    search: typeof q === 'string' ? q : '',
    categoryId: activeCategory?.id,
    brandId: (activeBrand as any)?.entityId,
    sort: sort === SORT.featured ? 'trending-desc' : '',
    locale,
  })

  let groupedProducts: ProductGroup[] | undefined = undefined
  if (data?.products && (!toggleFilter || !activeFilter)) {
    groupedProducts = [{ products: data.products }]
  } else if (
    data?.products &&
    toggleFilter &&
    activeFilter === ('categories' as SORT)
  ) {
    const uniqueCategories = data?.products
      .map((product) => product.productType)
      .filter((value, index, self) => self.indexOf(value) === index)
    groupedProducts = uniqueCategories.map((name) => ({
      name: name?.length > 0 ? name : 'Uncategorized',
      products: data.products.filter((product) => product.productType === name),
    }))
  } else if (
    data?.products &&
    toggleFilter &&
    activeFilter === ('season' as SORT)
  ) {
    const uniqueCollections = data?.products
      .flatMap((product) => product.collections)
      .filter(
        (value, index, self) =>
          self.findIndex((c) => c.id === value.id) === index
      )

    groupedProducts = uniqueCollections.map((collection) => ({
      name: collection.title,
      products: data.products.filter((product) =>
        product.collections.some((c) => c.id === collection.id)
      ),
    }))
    groupedProducts.push({
      name: 'Uncategorized',
      products: data.products.filter(
        (product) => product.collections.length === 0
      ),
    })
  } else if (
    data?.products &&
    toggleFilter &&
    activeFilter === ('featured' as SORT)
  ) {
    groupedProducts = [
      {
        products: data.products.sort((a, b) => {
          console.log(a, b)
          return a.featured === b.featured ? 0 : a.featured ? -1 : 1
        }),
      },
    ]
  }

  const handleClick = (event: any, filter: SortBy) => {
    if (filter !== activeFilter) {
      setToggleFilter(true)
    } else {
      setToggleFilter(!toggleFilter)
    }
    setActiveFilter(filter)
  }

  return (
    <>
      <div className={ps.sideLogo}>
        <Image src={fashionOutlined} alt="Fashion3" />
      </div>
      <div className="relative ml-auto z-10 px-10 md:pl-40">
        <div className="relative pt-3 pb-16 md:pb-32">
          {/* Sort */}
          <Link href="/">
            <a className="absolute left-0 top-6 hidden md:block z-20">
              <ArrowLong />
            </a>
          </Link>
          <div className="relative z-10 mb-12 md:mb-16">
            <div className="inline-block w-full">
              <div className="lg:hidden">
                <span className="rounded-md shadow-sm">
                  <button
                    type="button"
                    onClick={(e) => handleClick(e, null)}
                    className="flex justify-between w-full rounded-sm border border-accent-3 px-4 py-3 bg-accent-0 text-sm leading-5 font-medium text-accent-4 hover:text-accent-5 focus:outline-none focus:border-blue-300 focus:shadow-outline-normal active:bg-accent-1 active:text-accent-8 transition ease-in-out duration-150"
                    id="options-menu"
                    aria-haspopup="true"
                    aria-expanded="true"
                  >
                    {sort ? SORT[sort as keyof typeof SORT] : 'Relevance'}
                    <svg
                      className="-mr-1 ml-2 h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </span>
              </div>
              <div
                className={`origin-top-left absolute lg:relative left-0 mt-2 w-full rounded-md shadow-lg lg:shadow-none z-10 lg:block ${
                  activeFilter !== null || toggleFilter !== true ? 'hidden' : ''
                }`}
              >
                <div className="rounded-sm bg-accent-0 shadow-xs md:bg-transparent lg:shadow-none p-2.5 md:p-0">
                  <div
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                    className="flex flex-col items-end"
                  >
                    <Link href={{ pathname, query: filterQuery({ q }) }}>
                      <a
                        onClick={(e) => handleClick(e, null)}
                        className={
                          'block lg:inline-block px-4 py-2 lg:p-0 lg:my-2 lg:mx-4 text-xl font-normal'
                        }
                      >
                        Sort by
                      </a>
                    </Link>
                    <ul className="flex space-x-2">
                      {Object.entries(SORT).map(([key, text]) => (
                        <li key={key}>
                          <Button
                            onClick={(e) => handleClick(e, key as SORT)}
                            active={toggleFilter && activeFilter === key}
                            inverted
                          >
                            {text}
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div>
            {(q || activeCategory || activeBrand) && (
              <div className="mb-12 transition ease-in duration-75">
                {data ? (
                  <>
                    <span
                      className={cn('animated', {
                        fadeIn: data.found,
                        hidden: !data.found,
                      })}
                    >
                      Showing {data.products.length} results{' '}
                      {q && (
                        <>
                          for "<strong>{q}</strong>"
                        </>
                      )}
                    </span>
                    <span
                      className={cn('animated', {
                        fadeIn: !data.found,
                        hidden: data.found,
                      })}
                    >
                      {q ? (
                        <>
                          There are no products that match "<strong>{q}</strong>
                          "
                        </>
                      ) : (
                        <>
                          There are no products that match the selected
                          category.
                        </>
                      )}
                    </span>
                  </>
                ) : q ? (
                  <>
                    Searching for: "<strong>{q}</strong>"
                  </>
                ) : (
                  <>Searching...</>
                )}
              </div>
            )}
            {groupedProducts ? (
              <div className="space-y-24">
                {groupedProducts.map((group) => (
                  <div key={group.name}>
                    {group.name && (
                      <h4 className="mb-8 text-3xl">{group.name}</h4>
                    )}
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                      {group.products.map((product: Product) => (
                        <ProductCard
                          variant="simple"
                          key={product.path}
                          className="animated fadeIn"
                          product={product}
                          imgProps={{
                            width: 480,
                            height: 480,
                            alt: product.name,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 lg:grid-cols-5">
                {rangeMap(12, (i) => (
                  <Skeleton key={i}>
                    <div className="w-60 h-60" />
                  </Skeleton>
                ))}
              </div>
            )}{' '}
          </div>
        </div>
      </div>
      <Image
        src={fashionOutlinedBottom}
        className={s.fashion3BottomRight}
        alt="Fashion3"
      />
    </>
  )
}

Search.Layout = Layout
