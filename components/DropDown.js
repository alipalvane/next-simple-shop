import Link from "next/link"

const DropDown = ({href, children, ...rest}) => {
  return (
    <Link href={href}>
        <span {...rest}>{children}</span>
    </Link>
  )
}

export default DropDown