import Image from 'next/image'

const Logo = ({ className = '', ...props }) => (
  <Image
    src={'/logo.png'}
    alt="fashion^3"
    width={164}
    height={36}
    className={className}
  />
)

export default Logo
