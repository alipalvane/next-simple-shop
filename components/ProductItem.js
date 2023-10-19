import Link from "next/link";

const ProductItem = ({ item, addToCart }) => {
  return (
    <div className="bg-white rounded-xl mb-5 block">
      <Link href={`/product/${item.slug}`}>
        <img src={item.image} alt={item.title} className="rounded-t-xl"/>
      </Link>
      <div className="flex flex-col items-center justify-center p-5">
        <Link href={`/product/${item.slug}`}>
          <h3 className="text-lg">{item.title}</h3>
        </Link>
        <p className="p-2">{item.price}</p>
        <button
          onClick={()=>addToCart(item)}
          className="rounded-xl bg-gray-700 text-white px-4 py-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
