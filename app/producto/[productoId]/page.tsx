"use client";

import { useContext, useEffect, useState } from "react";
import { MdOutlineDriveFolderUpload } from "react-icons/md";
import axios from "axios";
import Link from "next/link";
import { FaLessThanEqual } from "react-icons/fa6";
import Image from "next/image";
import Cookies from "js-cookie";
import { Product } from "@/interface/Products";
import { UserData } from "@/interface/Users";
import GlobalContext from "@/context";

export default function VerProducto({
  params,
}: {
  params: { productoId: string };
}) {
  const [products, setProducts] = useState<Product>();
  const [quantity, setQuantity] = useState(1);
  const [agregado, setAgregado] = useState(false);

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products/${params.productoId}`
        );
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [params.productoId]);

  const incrementQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };

  async function handleSubmit() {
    try {
      const cartData = user?.cart;

      const productInCart = cartData?.cart_items.find(
        (item: any) => item.product.id === products?.id
      );

      if (productInCart) {
        console.log("El producto ya está en el carrito");
        setAgregado(true);
        setTimeout(() => {
          setAgregado(false);
        }, 3000);
        return;
      }
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity,
            product: products?.id,
            cart: user?.cart.id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        console.log(data);
      }
      setAgregado(true);
      setTimeout(() => {
        setAgregado(false);
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  if (products) {
    return (
      <main>
        <div className="flex flex-col md:flex-row min-h-screen h-2/3">
          {agregado && (
            <div className="flex w-full items-center justify-center z-50 bg-green-500 fixed top-0 text-white font-bold p-2">
              Elemento agregado
            </div>
          )}
          <div className="flex flex-col w-full md:w-1/2 p-3 md:p-10">
            <Image
              src={products.image[0]?.url}
              alt={products.name}
              width={533}
              height={800}
              className="rounded-xl h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex flex-col w-full md:w-1/2 p-10 space-y-8">
            <h1 className="text-3xl font-bold">{products.name}</h1>
            <p className="text-2xl font-semibold">${products.price}</p>
            <p className="text-xl font-semibold text-gray-700">
              Color: {products.color}
            </p>
            <p className="text-xl font-semibold text-gray-700">
              Tipo de toalla: {products.material}
            </p>
            <p className="text-gray-600 text-md whitespace-pre-wrap">
              {products.description}
            </p>
            <div className="flex items-center space-x-4">
              <p className="text-xl font-semibold">Cantidad:</p>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={decrementQuantity}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-l-lg"
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-20 text-center border-none outline-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded-r-lg"
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              className="bg-primary text-white p-3 rounded-lg hover:bg-pink-700 transition-colors duration-300"
            >
              Añadir al Carrito
            </button>
          </div>
        </div>
      </main>
    );
  }
}
