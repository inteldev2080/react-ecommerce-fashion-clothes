import NextLink, { LinkProps as NextLinkProps } from 'next/link'

const Link = ({
  href,
  children,
  ...props
}: NextLinkProps & {
  children: React.ReactNode
}): JSX.Element => {
  return (
    <NextLink href={href}>
      <a {...props}>{children}</a>
    </NextLink>
  )
}

export default Link
