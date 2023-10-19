import { useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { Store } from "../context/Cart";
import Layout from "../components/Layout";
import CheckoutWizard from "../components/CheckoutWizard";

const shipping = () => {
  const { handleSubmit, setValue, register } = useForm();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { state, dispatch } = useContext(Store);

  const { cart } = state;
  const { shippingData } = cart;

  useEffect(() => {
    setValue("name", shippingData.name);
    setValue("address", shippingData.address);
    setValue("postalCode", shippingData.postalCode);
  }, [
    setValue,
    shippingData.name,
    shippingData.address,
    shippingData.postalCode,
  ]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const router = useRouter();

  const submitHandler = ({ name, address, postalCode }) => {
    dispatch({
      type: "SAVE_SHIPPING_DATA",
      payload: { name, address, postalCode },
    });

    Cookies.set(
      "cart",
      JSON.stringify({
        ...cart,
        shippingData: {
          name,
          address,
          postalCode,
        },
      })
    );

    router.push("/payment");
  };

  return (
    <Layout title="shipping">
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className="mb-4 text-xl font-bold">Shipping</h2>
        <div className="mb-4">
          <input
            className="w-full rounded-xl p-2 outline-0 mb-4"
            id="name"
            placeholder="Name"
            autoFocus
            {...register('name')}
          />
          <input
            className="w-full rounded-xl p-2 outline-0 mb-4"
            id="address"
            placeholder="Address"
            autoFocus
            {...register('address')}
          />
          <input
            className="w-full rounded-xl p-2 outline-0 mb-4"
            id="postalCode"
            placeholder="Postal Code"
            autoFocus
            {...register('postalCode')}
          />
        </div>
        <div>
          <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};
shipping.auth = true
export default shipping;
