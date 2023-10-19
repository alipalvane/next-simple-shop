import { useEffect, useState } from "react";
import Layout from "../components/Layout";
function OrderHistory() {
  const [orders, setOrders] = useState([]);

  async function fetchOrders() {
    const response = await fetch("api/orders/history");
    const data = await response.json();
    setOrders(data)
  }
  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <Layout title="order history">
      <h2 className="text-lg">Order History</h2>
      <div>
        {orders.map((item)=>(
            <div key={item._id} className="flex p-2">
                <div className="px-2">{item._id}</div>
                <div className="px-2">{item.totalPrice}</div>
            </div>
        ))}
      </div>
    </Layout>
  );
}

export default OrderHistory;
