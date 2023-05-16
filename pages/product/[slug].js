import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import productItems from "../../data/products.json";
import Image from "next/image";
import { useContext } from "react";
import { cartContext } from "../../context/Cart";

function ProductPage() {
  const { state, dispatch } = useContext(cartContext);

  const router = useRouter();

  const { query } = useRouter();
  //slug is name of file for dynamic route
  const { slug } = query;

  const product = productItems.find((pItem) => pItem.slug === slug);

  if (!product) {
    return (
      <div className="h-screen flex items-center justify-center">
        Product Not Found !
      </div>
    );
  }

  function addToCartHandler() {
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    );

    const qty = existingItem ? existingItem.qty + 1 : 1;

    if (product.count < qty) {
      alert("sold out");
      return;
    }

    dispatch({ type: "ADD_ITEMS", payload: { ...product, qty } });

    router.push('/cart')
  }

  return (
    <Layout title={product.title}>
      <div className="grid md:grid-cols-4 md:gap-3 bg-white rounded-xl p-10">
        <div className="md:col-span-2">
          <Image
            className="rounded-xl"
            src={product.image}
            width={340}
            height={340}
          />
        </div>
        <div>
          <div className="text-lg">
            <h2>{product.title}</h2>
            <p className="text-gray-500 text-sm">{product.cat}</p>
            <p>{product.description}</p>
          </div>
        </div>
        <div className="p-5">
          <div className="mb-2 flex justify-between">
            <div>
              <p>Price:</p>
              <h4>{product.price}</h4>
            </div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>
              <p>Status:</p>
              <h4>{product.count > 0 ? "Availabe" : "Unavailable"}</h4>
            </div>
          </div>
          <button
            onClick={addToCartHandler}
            className="rounded-xl bg-gray-700 text-white px-4 py-2 w-full"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default ProductPage;
