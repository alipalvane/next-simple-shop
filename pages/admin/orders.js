import Link from "next/link";
import { useEffect, useState } from "react";
import Layout from "../../components/Layout";

function Orders() {
  const [adminOrders, setAdminOrders] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/admin/orders");
      const data = await response.json();
      setAdminOrders(data);
    }
    fetchData();
  }, []);

  return (
    <Layout title="admin orders">
      <div className="grid md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link
                className="bg-white px-3 py-2 rounded-md block mb-2 font-bold"
                href="/admin/dashboard"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                className="bg-white px-3 py-2 rounded-md block mb-2"
                href="/admin/orders"
              >
                Orders
              </Link>
            </li>
            <li>
              <Link
                className="bg-white px-3 py-2 rounded-md block mb-2"
                href="/admin/products"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                className="bg-white px-3 py-2 rounded-md block mb-2"
                href="/admin/users"
              >
                Users
              </Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="mb-4 text-xl">Admin Orders</h2>
          {adminOrders.map((item, index) => (
            <div key={index} className="grid grid-cols-4">
              <div className="bg-white m-2 p-2 rounded-md">
                <p className="text-lg">Price : {item.totalPrice}</p>
              </div>
              <div className="bg-white m-2 p-2 rounded-md">
                <p className="text-lg">Payment : {item.paymentMethod}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Orders;
