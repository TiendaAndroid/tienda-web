"use client";
import Cards from "@/components/Cards";
import NavBar from "@/components/NavBar";
import { Product } from "@/interface/Products";
import {
  Check,
  ChevronDownIcon,
  MinusIcon,
  PlusIcon,
  TrainFrontTunnelIcon,
} from "lucide-react";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Spinner } from "@nextui-org/spinner";
import GlobalContext from "@/context";
import { Pagination } from "@nextui-org/react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

const sortOptions = [
  { name: "Most Popular", href: "#", current: false },
  { name: "Best Rating", href: "#", current: false },
  { name: "Newest", href: "#", current: false },
  { name: "Price: Low to High", href: "#", current: false },
  { name: "Price: High to Low", href: "#", current: false },
];
const filters = [
  {
    id: "color",
    name: "Color",
    options: [
      { value: "Blanco", label: "Blanco", checked: false },
      { value: "Amarillo", label: "Amarillo", checked: false },
      { value: "Rojo", label: "Rojo", checked: false },
      { value: "Azul", label: "Azul", checked: false },
      { value: "Negro", label: "Negro", checked: false },
      { value: "Rosa", label: "Rosa", checked: false },
    ],
  },
  {
    id: "category",
    name: "Category",
    options: [
      { value: "Toalla%20Regular", label: "Regular", checked: false },
      { value: "Toalla%20Nocturna", label: "Nocturna", checked: false },
      { value: "Toalla%20Teen", label: "Teen", checked: true },
      { value: "Pantiprotectores%20Diarios", label: "Panties", checked: false },
      { value: "Kits", label: "Kits", checked: false },
    ],
  },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Productos() {
  const [products, setProducts] = useState<Product[]>([]); // Asegurar que products siempre es un array vacío por defecto
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(9);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<{
    type: string;
    value: string;
  } | null>(null);

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?offset=${offset}&limit=${limit}`;

        if (selectedFilter) {
          const { type, value } = selectedFilter;
          if (type === "color") {
            apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/color/${value}`;
          } else if (type === "category") {
            apiUrl = `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/tipo/${value}`;
          }
        }

        console.log(apiUrl);

        const response = await fetch(apiUrl);
        const data = await response.json();
        setProducts(data.data || []); // Asegurar que products siempre es un array
        setTotalPages(Math.ceil(data.totalResults / limit));
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [offset, limit, selectedFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setOffset(page - 1);
  };

  const handleFilterChange = (type: string, value: string) => {
    setSelectedFilter({ type, value });
    setCurrentPage(1);
  };
  return (
    <main className="flex h-screen flex-col items-center">
      <div className="flex flex-col w-full">
        <div className="bg-white">
          <div>
            {/* Mobile filter dialog */}
            <Dialog
              open={mobileFiltersOpen}
              onClose={setMobileFiltersOpen}
              className="relative z-40 lg:hidden"
            >
              <DialogBackdrop
                transition
                className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
              />

              <div className="fixed inset-0 z-40 flex">
                <DialogPanel
                  transition
                  className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
                >
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      onClick={() => setMobileFiltersOpen(false)}
                      className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    >
                      <span className="sr-only">Close menu</span>
                      <div aria-hidden="true" className="h-6 w-6" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        key={section.id}
                        as="div"
                        className="border-t border-gray-200 px-4 py-6"
                      >
                        <h3 className="-mx-2 -my-3 flow-root">
                          <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              <PlusIcon
                                aria-hidden="true"
                                className="h-5 w-5 group-data-[open]:hidden"
                              />
                              <MinusIcon
                                aria-hidden="true"
                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-6">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-mobile-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="radio"
                                  onChange={() =>
                                    handleFilterChange(section.id, option.value)
                                  }
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                  className="ml-3 min-w-0 flex-1 text-gray-500"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ))}
                  </form>
                </DialogPanel>
              </div>
            </Dialog>

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900">
                  Productos
                </h1>

                <div className="flex items-center">
                  <button
                    type="button"
                    className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                  >
                    <span className="sr-only">View grid</span>
                    <div aria-hidden="true" className="h-5 w-5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMobileFiltersOpen(true)}
                    className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
                  >
                    <span className="sr-only">Filters</span>
                    <TrainFrontTunnelIcon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </button>
                </div>
              </div>

              <section
                aria-labelledby="products-heading"
                className="pb-24 pt-6"
              >
                <h2 id="products-heading" className="sr-only">
                  Products
                </h2>

                <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
                  {/* Filters */}
                  <form className="hidden lg:block">
                    <h3 className="sr-only">Categories</h3>

                    {filters.map((section) => (
                      <Disclosure
                        key={section.id}
                        as="div"
                        className="border-b border-gray-200 py-6"
                      >
                        <h3 className="-my-3 flow-root">
                          <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="ml-6 flex items-center">
                              <PlusIcon
                                aria-hidden="true"
                                className="h-5 w-5 group-data-[open]:hidden"
                              />
                              <MinusIcon
                                aria-hidden="true"
                                className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                              />
                            </span>
                          </DisclosureButton>
                        </h3>
                        <DisclosurePanel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  defaultValue={option.value}
                                  defaultChecked={option.checked}
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}[]`}
                                  type="radio"
                                  className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                  onChange={() =>
                                    handleFilterChange(section.id, option.value)
                                  }
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                              </div>
                            ))}
                          </div>
                        </DisclosurePanel>
                      </Disclosure>
                    ))}
                  </form>

                  {/* Product grid */}
                  <div className="lg:col-span-3">
                    {loading ? (
                      <div className="flex justify-center items-center h-64">
                        <Spinner size="lg" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 p-8">
                        {products.length > 0 ? (
                          products.map((product) => (
                            <Cards key={product.id} item={product} />
                          ))
                        ) : (
                          <p className="text-center text-gray-500">
                            No products found.
                          </p>
                        )}
                      </div>
                    )}

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
                </div>
              </section>
            </main>
          </div>
        </div>

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
