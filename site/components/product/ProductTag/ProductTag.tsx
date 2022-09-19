import cn from 'clsx'
import { inherits } from 'util'
import s from './ProductTag.module.css'

interface ProductTagProps {
  className?: string
  name: string
  price: string
  fontSize?: number
}

const ProductTag: React.FC<ProductTagProps> = ({
  name,
  price,
  className = '',
  fontSize = 32,
}) => {
  return (
    <div>
      <h3 className="text-64xl leading-[95%]">
        {name}
      </h3>
      <div className="text-36xl">{price}</div>
    </div>
  )
}

export default ProductTag
