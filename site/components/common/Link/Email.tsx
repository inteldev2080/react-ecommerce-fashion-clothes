const Email = ({ children }: { children: string }): JSX.Element => {
  return <a href={`mailto:${children}`}>{children}</a>
}

export { Email }
