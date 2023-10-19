/* eslint-disable react-hooks/rules-of-hooks */
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Store } from "../context/Cart";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";

const placeorder = () => {

  const router = useRouter()

  const { state } = useContext(Store);
  const { cart } = state;
  const { shippingData, paymentMethod, cartItems } = cart;

  
  async function placeOrderHandler(){
    const totalPrice = cartItems.reduce((acc, curr) => acc + curr.qty * curr.price, 0)
    await fetch('/api/orders', {
      method:'POST',
      //to save data in db, your data have to string (not Json becase json in for get from db and show on our UI)
      //data for send to db writen in body
      body: JSON.stringify({
        orderItems: cartItems,
        shippingData,
        paymentMethod,
        totalPrice
      }),
      headers: { 'Content-Type': 'application/json' }
    })

    router.push('/order-completed')

  }
  return (
    <Layout title="Place Order">
      <CheckoutWizard activeStep={3} />
      <h1 className="mb-4 text-xl">Place Order</h1>
      <div className="grid md:grid-cols-4 md:gap-5">
        <div className="overflow-x-auto md:col-span-3">
          <div className="p-5">
            <h2 className="text-lg">Shipping Data</h2>
            <div>
              {`${shippingData.name} - ${shippingData.address} - ${shippingData.postalCode}`}
            </div>
            <div>
              <Link
                href="/shipping"
                className="bg-gray-700 text-white px-3 text-sm rounded-sm inline-block"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="p-5">
            <h2 className="mb-2 text-lg">Payment Method</h2>
            <p>{paymentMethod}</p>
            <div>
              <Link
                href="/payment"
                className="bg-gray-700 text-white px-3 text-sm rounded-sm inline-block"
              >
                Edit
              </Link>
            </div>
          </div>
          <div className="overflow-x-auto p-5">
            <h2 className="mb-5 text-lg">Order Items</h2>
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th className="px-5 text-left">Item</th>
                  <th className="p-5 text-right">Qty</th>
                  <th className="p-5 text-right">Price</th>
                  <th className="p-5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id} className="border-b">
                    <td>
                      <div className="flex items-center">
                        <Image
                          src={item.image}
                          alt={item.title}
                          width={50}
                          height={50}
                        />
                        <span>{item.title}</span>
                      </div>
                    </td>
                    <td className="p-5 text-right">{item.qty}</td>
                    <td className="p-5 text-right">{item.price}</td>
                    <td className="p-5 text-right">{item.qty * item.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <Link
                href="/cart"
                className="bg-gray-700 text-white px-3 text-sm rounded-sm inline-block"
              >
                Edit
              </Link>
            </div>
          </div>
        </div>
        <div className="p-5">
          <h2 className="mb-5 text-lg">Order Summary</h2>
          <ul>
            <li>
              <div className="mb-2 flex justify-between">
                <h3>Total Price</h3>
                <p>
                  {cartItems.reduce(
                    (acc, curr) => acc + curr.qty * curr.price,
                    0
                  )}
                </p>
              </div>
            </li>
            <li>
              <button onClick={placeOrderHandler} className="rounded-xl bg-gray-700 text-white px-4 py-2">Place Order</button>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
};

export default placeorder;
