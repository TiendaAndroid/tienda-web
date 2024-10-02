"use client";
import Cards from "@/components/Cards";
import NavBar from "@/components/NavBar";
import { Product } from "@/interface/Products";
import { Check } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Spinner } from "@nextui-org/spinner";
import GlobalContext from "@/context";
import { Pagination } from "@nextui-org/react";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(12);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?offset=${offset}&limit=${limit}`
        );
        const data = await response.json();
        setProducts(data.data);
        setTotalPages(Math.ceil(data.totalResults / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [offset, limit]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset(page - 1);
  };

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
                <Cards key={product.id} item={product} />
              ))}
            </div>
            <div className="flex w-full justify-center">
              <Pagination
                showControls
                total={totalPages}
                initialPage={1}
                page={currentPage}
                color={"primary"}
                onChange={handlePageChange}
              />
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
