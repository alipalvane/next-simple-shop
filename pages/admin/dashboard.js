import Link from "next/link";
import { useState, useEffect } from "react";

import Layout from "../../components/Layout";

function DashboardPage() {
  const [adminData, setAdminData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("/api/admin/summary");

      const data = await response.json();

      setAdminData(data);
    }

    fetchData();
  }, []);

  return (
    <Layout title="Admin Dashboard">
      <div className="grid  md:grid-cols-4 md:gap-5">
        <div>
          <ul>
            <li>
              <Link className="bg-white px-3 py-2 rounded-md block mb-2 font-bold" href="/admin/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link className="bg-white px-3 py-2 rounded-md block mb-2" href="/admin/orders">Orders</Link>
            </li>
            <li>
              <Link className="bg-white px-3 py-2 rounded-md block mb-2" href="/admin/products">Products</Link>
            </li>
            <li>
              <Link className="bg-white px-3 py-2 rounded-md block mb-2" href="/admin/users">Users</Link>
            </li>
          </ul>
        </div>
        <div className="md:col-span-3">
          <h2 className="mb-4 text-xl">Admin Dashboard</h2>
          <div>
            {adminData.map((item, index) => (
              <div key={index} className="flex p-2">
                <div className=" bg-white mr-2 rounded-md px-3 py-2">
                  Orders: {item.ordersCount}
                </div>
                <div className=" bg-white mr-2 rounded-md px-3 py-2">
                  Products : {item.productsCount}
                </div>
                <div className=" bg-white rounded-md px-3 py-2">
                  Users : {item.usersCount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

DashboardPage.auth = { adminOnly: true };
export default DashboardPage;
