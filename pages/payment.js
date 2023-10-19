import { useState, useContext } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";
import { Store } from "../context/Cart";

const payment = () => {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { paymentMethod } = cart;

  const [selectPayment, setSelectPayment] = useState("");
  const router = useRouter();

  function submitHandler(event) {
    event.preventDefault()

    if (!selectPayment) {
      alert('Please Select Payment Method')
    }

    dispatch({ type: ' SAVE_PAYMENT_METHOD', payload: selectPayment })

    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        paymentMethod: selectPayment,
      })
    )

    router.push('/placeorder')
  }
  

  const methods = ["Getway", "Offline Payment"];
  return (
    <Layout title="payment page">
      <CheckoutWizard activeStep={2} />
      <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
        <h2 className="mb-4 text-xl">Payment Method</h2>
        {methods.map((item) => (
          <div key={item} className="mb-4">
              <input
              name='paymentMethod'
              className='p-2 outline-none focus:ring-0'
              id={item}
              type='radio'
              checked={selectPayment === item}
              onChange={() => setSelectPayment(item)}
            />
            <label className='p-2' htmlFor={item}>
              {item}
            </label>
          </div>
        ))}
        <div className="mb-4 flex justify-between">
          <button
            onClick={() => router.push("/shipping")}
            type="button"
            className="rounded-xl bg-gray-300 text-gray-700 px-4 py-2 w-28"
          >
            Back
          </button>
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default payment;
