import Head from "next/head";
import Link from "next/link";
import { useContext, useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu } from "@headlessui/react";
import Cookies from "js-cookie";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Store } from "../context/Cart";
import dynamic from "next/dynamic";
import DropDown from "./DropDown";

const Layout = ({ children, title }) => {
  const { status, data: session } = useSession();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;

  const [cartItemCount, setCartItemsCount] = useState(0);

  useEffect(() => {
    setCartItemsCount(cart.cartItems.reduce((acc, cur) => acc + cur.qty, 0));
  }, [cart.cartItems]);

  function logoutHandler() {
    Cookies.remove();
    signOut({ callbackUrl: "/login" });
  }

  return (
    <>
      <Head>
        <title>{`${title} - NextShop`}</title>
      </Head>
      <ToastContainer position="bottom-right" limit={1} />
      <div className="flex min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-14 px-8 justify-between items-center border-b-4 bg-white">
            <Link href="/" className="text-lg font-bold text-gray-700">
              Shopping
            </Link>
            <div>
              <Link href="/cart" className="p-2">
                Cart
                <span className="ml-1 rounded-xl bg-gray-200 px-2 py-1 text-xs font-bold">
                  {cartItemCount}
                </span>
              </Link>
              {status === "loading" ? (
                "loading"
              ) : session?.user ? (
                <Menu as="div" className="relative inline-block">
                  <Menu.Button className="bg-gray-700 px-2 py-1 rounded text-white">
                    {session.user.name}
                  </Menu.Button>
                  <Menu.Items className="absolute shadow right-0 w-56 bg-white rounded-xl p-4 origin-top-right border-w border-slate-100">
                    <Menu.Item>
                      <DropDown className="flex p-2" href="/profile">
                        Profile
                      </DropDown>
                    </Menu.Item>
                    <Menu.Item>
                      <DropDown className="flex p-2" href="/order-history">
                        Order History
                      </DropDown>
                    </Menu.Item>
                    {session.user.isAdmin && (
                      <Menu.Item>
                        <DropDown className="flex p-2" href="/admin/dashboard">
                          Dashboard
                        </DropDown>
                      </Menu.Item>
                    )}
                    <Menu.Item>
                      <a
                        className="flex p-2 text-red-600"
                        href="javascript:void(0)"
                        onClick={logoutHandler}
                      >
                        Logout
                      </a>
                    </Menu.Item>
                  </Menu.Items>
                </Menu>
              ) : (
                <Link href="/login" className="p-2">
                  Login
                </Link>
              )}
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex justify-center items-center h-10">
          Design with 💙 by Ali Palvane
        </footer>
      </div>
    </>
  );
};

export default dynamic(() => Promise.resolve(Layout), { ssr: false });
