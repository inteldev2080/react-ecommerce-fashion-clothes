import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react'

const BlankLink = (
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
): JSX.Element => {
  return <a target="_blank" rel="noopener noreferrer" {...props} />
}

export { BlankLink }
