"use client";
import { Button } from "@/components/ui/button";
import GlobalContext from "@/context";
import { Currency, Trash2 } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { Spinner } from "@nextui-org/spinner";

export default function Cart() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;
  const [selectedAddressId, setSelectedAddressId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [error, setError] = useState(false);

  const totalCost = user?.cart.cart_items.reduce(
    (total, cart) => total + cart.product.price * cart.quantity,
    0
  );

  const totalItems = user?.cart.cart_items.length;

  const onRemove = async (cartId: string) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/item/${cartId}`,
        {
          method: "DELETE",
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log("Producto eliminado del carrito");
      } else {
        console.error("Error al eliminar el producto del carrito");
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito", error);
    }
  };

  const updateQuantity = async (cartId: string, quantity: number) => {
    if (quantity > 0) {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/item/${cartId}`,
          {
            method: "PATCH",
            body: JSON.stringify({ quantity }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response);

        if (response.status === 200) {
          console.log("Cantidad actualizada del item en el carrito");
        } else {
          console.error(
            "Error al actualizar la cantidad del item en el carrito"
          );
        }
      } catch (error) {
        console.error(
          "Error al actualizar la cantidad del item en el carrito",
          error
        );
      }
    }
  };

  const handlePayment = async () => {
    if (!selectedAddressId || user?.cart.cart_items.length == 0) {
      setError(true);
      return;
    }

    setLoading(true);

    try {
      const token = Cookies.get("token");

      const responseDir = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/directions/${selectedAddressId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const dataDir = await responseDir.json();

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/payments/create-payment-session`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currency: "mxn",
            tipo: dataDir.tipo,
            pais: String(dataDir.pais),
            municipio: String(dataDir.municipio),
            estado: String(dataDir.estado),
            calle: String(dataDir.calle),
            noExterior: String(dataDir.noExterior),
            noInterior: String(dataDir.noInterior) || null,
            colonia: String(dataDir.colonia),
            cp: Number(dataDir.cp),
          }),
        }
      );
      const data = await response.json();

      if (response.ok) {
        const responseDir = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/${user?.cart.id}`,
          {
            method: "DELETE",
          }
        );
        router.push(data.url);
      } else {
        console.error("Error al crear la sesión de pago", data);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error al crear la sesión de pago", error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center ">
        <div className=" rounded-xl items-center flex flex-col space-y-3 w-1/3">
          <Spinner size="lg" />
        </div>
      </main>
    );
  }

  return (
    <section className=" relative z-10 after:contents-[''] after:absolute after:z-0 after:h-full xl:after:w-1/3 after:top-0 after:right-0 after:bg-gray-50">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto relative z-10">
        <div className="grid grid-cols-12">
          <div className="col-span-12 xl:col-span-8 lg:pr-8 pt-14 pb-8 lg:py-24 w-full max-xl:max-w-3xl max-xl:mx-auto">
            <div className="flex items-center justify-between pb-8 border-b border-gray-300">
              <h2 className="font-manrope font-bold text-3xl leading-10 text-black">
                Carrito de Compras
              </h2>
              <h2 className="font-manrope font-bold text-xl leading-8 text-gray-600">
                {totalItems} Artículo
              </h2>
            </div>
            <div className="grid grid-cols-12 mt-8 max-md:hidden pb-6 border-b border-gray-200">
              <div className="col-span-12 md:col-span-7">
                <p className="font-normal text-lg leading-8 text-gray-400">
                  Detalles del producto
                </p>
              </div>
              <div className="col-span-12 md:col-span-5">
                <div className="grid grid-cols-5">
                  <div className="col-span-3">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Cantidad
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-normal text-lg leading-8 text-gray-400 text-center">
                      Total
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {user?.cart.cart_items.length == 0 && (
              <div className="flex justify-center flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                No tienes ningún artículo en el carrito &#128546;
              </div>
            )}
            {user?.cart.cart_items.map((cart, index) => (
              <div  key={index} className="flex flex-col min-[500px]:flex-row min-[500px]:items-center gap-5 py-6  border-b border-gray-200 group">
                <div className="w-full md:max-w-[126px]">
                  <Image
                    src={cart.product.image[0].url}
                    width={500}
                    height={500}
                    alt="perfume bottle image"
                    className="mx-auto rounded-xl object-cover"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                  <div className="md:col-span-2">
                    <div className="flex flex-col max-[500px]:items-center gap-3">
                      <h6 className="font-semibold text-base leading-7 text-black">
                        {cart.product.name}
                      </h6>
                      <h6 className="font-normal text-base leading-7 text-gray-500">
                        Toalla {cart.product.material}
                      </h6>
                      <h6 className="font-medium text-base leading-7 text-gray-600 transition-all duration-300 group-hover:text-primary">
                        ${cart.product.price}
                      </h6>
                    </div>
                  </div>
                  <div className="flex items-center max-[500px]:justify-center h-full max-md:mt-3">
                    <div className="flex items-center h-full">
                      <button
                        onClick={() =>
                          updateQuantity(cart.id, cart.quantity - 1)
                        }
                        className="group rounded-l-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[73px] min-w-[60px] placeholder:text-gray-900 py-[15px]  text-center bg-transparent"
                        placeholder={cart.quantity.toString()}
                      />
                      <button
                        onClick={() =>
                          updateQuantity(cart.id, cart.quantity + 1)
                        }
                        className="group rounded-r-xl px-5 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:bg-gray-50 hover:border-gray-300 hover:shadow-gray-300 focus-within:outline-gray-300"
                      >
                        <svg
                          className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                          xmlns="http://www.w3.org/2000/svg"
                          width="22"
                          height="22"
                          viewBox="0 0 22 22"
                          fill="none"
                        >
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                          <path
                            d="M11 5.5V16.5M16.5 11H5.5"
                            stroke=""
                            stroke-opacity="0.2"
                            stroke-width="1.6"
                            stroke-linecap="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center max-[500px]:justify-center md:justify-end max-md:mt-3 h-full space-x-5">
                    <p className="font-bold text-lg leading-8 text-gray-600 text-center transition-all duration-300 group-hover:text-primary">
                      ${cart.quantity * cart.product.price}
                    </p>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => onRemove(cart.id)}
                      className="bg-red-500 text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className=" col-span-12 xl:col-span-4 z-0 bg-gray-50 w-full max-xl:px-6 max-w-3xl xl:max-w-lg mx-auto lg:pl-8 py-24">
            <h2 className="font-manrope font-bold text-3xl leading-10 text-black pb-8 border-b border-gray-300">
              Resumen de la orden
            </h2>
            <div className="mt-8">
              <div className="flex items-center justify-between pb-6">
                <p className="font-normal text-lg leading-8 text-black">
                  {totalItems} Articulo
                </p>
                <p className="font-medium text-lg leading-8 text-black">
                  ${totalCost}
                </p>
              </div>
              <form>
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                  Código de promoción
                </label>
                <div className="flex pb-4 w-full">
                  <div className="relative w-full ">
                    <input
                      type="text"
                      className="block w-full h-11 pr-11 pl-5 py-2.5 text-base font-normal shadow-xs text-gray-900 bg-white border border-gray-300 rounded-lg placeholder-gray-500 focus:outline-gray-400 "
                      placeholder="xxxx xxxx xxxx"
                    />
                  </div>
                </div>
                <div className="flex items-center ">
                  <button className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80">
                    Aplicar
                  </button>
                </div>
                <label className="flex items-center mb-1.5 text-gray-400 text-sm font-medium">
                  Selecciona la dirección
                </label>
                <div className="flex pb-4 w-ful ">
                  <div className="relative w-full space-y-3">
                    {Array.isArray(user?.direction) &&
                      user?.direction.map((dir) => (
                        <div
                          key={dir.id}
                          className="flex items-center bg-white p-4 rounded-lg shadow space-x-5 cursor-pointer"
                          onClick={() => {
                            document.getElementById(`${dir.id}`)?.click();
                            setSelectedAddressId(dir.id);
                          }}
                        >
                          <input
                            type="radio"
                            name="direccion"
                            id={`${dir.id}`}
                            className="h-5 w-5 bg-primary text-primary ring-primary ring-offset-primary"
                          />
                          <div>
                            <p className="font-semibold">
                              {dir.calle + " " + dir.noExterior + " "}
                              {dir.noInterior != null ? dir.noInterior : ""}
                            </p>
                            <p className="text-sm text-gray-600">
                              {dir.municipio}, {dir.colonia}, {dir.cp}
                            </p>
                            <p className="text-sm text-gray-600">
                              {dir.estado}, {dir.pais}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="flex items-center border-b border-gray-200">
                  <Link
                    href={"/usuario/direcciones"}
                    className="rounded-lg w-full bg-black py-2.5 px-4 text-white text-sm font-semibold text-center mb-8 transition-all duration-500 hover:bg-black/80"
                  >
                    Agregar dirección
                  </Link>
                </div>

                <div className="flex items-center justify-between py-8">
                  <p className="font-medium text-xl leading-8 text-black">
                    {totalItems} Articulo
                  </p>
                  <p className="font-semibold text-xl leading-8 text-primary">
                    ${totalCost}
                  </p>
                </div>
                {error && !selectedAddressId && (
                  <p className="p-3 text-red-500">
                    Seleccione una dirección antes de pagar
                  </p>
                )}
                {error && user?.cart.cart_items.length == 0 && (
                  <p className="p-3 text-red-500">
                    Agregue por lo menos un articulo para proceder al pago
                  </p>
                )}

                <button
                  onClick={(e) => {
                    handlePayment();
                    e.preventDefault();
                  }}
                  className="w-full text-center bg-primary rounded-xl py-3 px-6 font-semibold text-lg text-white transition-all duration-500 hover:bg-pink-600"
                >
                  Pagar
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
