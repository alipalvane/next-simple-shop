import Link from "next/link"
import Layout from "../components/Layout"

const orderCompleted = () => {
  return (
    <Layout title='order complete'>
        <h1 className="text-lg">Thank for you order</h1>
        <Link href='/order-history'>order History</Link>

    </Layout>
  )
}

export default orderCompleted