

import React from "react";
import Products from "@/components/Products";
import { useFetch } from "../../hooks/useFetch";

const Home = () => {
  const { data, loading } = useFetch("/product/get");

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col items-center text-gray-900 dark:text-white">
      <header className="w-full bg-white dark:bg-gray-800 shadow-md py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-2">
            <span className="text-blue-600">Shop</span>WithUs
          </h1>
          <p className="text-lg">
            Your favorite online store for premium products.
          </p>
        </div>
      </header>

      <main className="flex-grow w-full max-w-6xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold mb-4 text-center border-b pb-2">
            Featured Products
          </h2>
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
          ) : (
            <Products data={data} />
          )}
        </div>
      </main>

      <footer className="w-full bg-white dark:bg-gray-800 py-4 shadow-t-md">
        <div className="max-w-7xl mx-auto text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} ShopWithUs. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
