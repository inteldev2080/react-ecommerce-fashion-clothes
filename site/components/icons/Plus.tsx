const Plus = ({ strokeWidth = 1.5, ...props }) => {
  return (
    <svg width={32} height={32} viewBox="0 0 32 32" fill="none" {...props}>
      <path
        d="M16 0V32"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0 16H32"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default Plus
