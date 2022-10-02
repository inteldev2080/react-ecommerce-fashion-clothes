const ArrowLong = ({ ...props }) => {
  return (
    <svg
      width="49"
      height="32"
      viewBox="0 0 49 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M48 16H5"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 7L5 16L14 25"
        stroke="black"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default ArrowLong
