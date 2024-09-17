"use client";
import Card from "@/components/Card";
import NavBar from "@/components/NavBar";
import { Product } from "@/interface/Products";
import { Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Spinner } from "@nextui-org/spinner";
import GlobalContext from "@/context";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/products`);
        const data = await response.json();
        setProducts(data.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main className="flex h-screen flex-col items-center">
      <div className="flex flex-col w-full">
        <NavBar />
        <section className="container mx-auto px-4 py-16 md:py-24 bg-pink-100">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 p-8 ">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Comodidad y Cuidado Natural
              </h1>
              <p className="text-xl text-gray-600 mb-6">
                Descubre nuestras toallas femeninas de algodón, suaves con tu
                piel y con el medio ambiente.
              </p>
              <button className="bg-primary p-3 rounded-md text-white hover:bg-pink-700 transition-colors duration-300">
                Comprar Ahora
              </button>
            </div>
            <div className="md:w-1/2"></div>
          </div>
        </section>
        <section className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Nuestros Productos Destacados
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 p-8">
              {products.map((product) => (
                <Card key={product.id} item={product} />
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-pink-100">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              ¿Por qué elegir nuestras toallas?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "100% Algodón",
                  description: "Suaves y delicadas con tu piel",
                },
                {
                  title: "Ecológicas",
                  description: "Biodegradables y libres de plásticos",
                },
                {
                  title: "Hipoalergénicas",
                  description: "Ideales para pieles sensibles",
                },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center"
                >
                  <div className="bg-white rounded-full p-4 mb-4">
                    <Check className="h-8 w-8 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
