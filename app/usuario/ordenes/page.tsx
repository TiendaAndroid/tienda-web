"use client";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { UserData } from "@/interface/Users";
import { RiEmotionSadFill } from "react-icons/ri";
import GlobalContext from "@/context";

export default function OrdersUser() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(false);

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;


  return (
    <section className="py-24 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
        <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
          Ordenes
        </h2>
        <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
          Hola {user?.name} {user?.lastName} estas son las ordenes
        </p>

        {user?.orders?.length ?? 0 > 0 ? (
          Array.isArray(user?.orders) && user?.orders?.map((order) => (
            <div key={order.id} className="main-box mb-5 border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
                <div className="data">
                  <p className="font-semibold text-base leading-7 text-black">
                    Id de la orden:{" "}
                    <span className="text-indigo-600 font-medium">{order.id}</span>
                  </p>
                  <p className="font-semibold text-base leading-7 text-black mt-4">
                    Fecha de pago:{" "}
                    <span className="text-gray-400 font-medium">
                    {new Date(order.createdAt).toISOString().split('T')[0]}
                    </span>
                  </p>
                </div>
                <button className="rounded-full py-3 px-7 font-semibold text-sm leading-7 text-white bg-indigo-600 max-lg:mt-5 shadow-sm shadow-transparent transition-all duration-500 hover:bg-indigo-700 hover:shadow-indigo-400">
                  Ver la orden
                </button>
              </div>
              {order.order_items.map((item) => (
                <div key={item.id} className="w-full px-3 min-[400px]:px-6">
                  <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
                    <div className="img-box max-lg:w-full">
                      <img
                        src={item.product.image[0].url}
                        alt={item.product.name}
                        className="aspect-square w-full lg:max-w-[140px] rounded-xl object-cover"
                      />
                    </div>
                    <div className="flex flex-row items-center w-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                        <div className="flex items-center">
                          <div>
                            <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                              {item.product.name}
                            </h2>
                            <div className="flex items-center">
                              <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                Tamaño: <span className="text-gray-500">{item.product.material}</span>
                              </p>
                              <p className="font-medium text-base leading-7 text-black">
                                Cantidad: <span className="text-gray-500">{item.quantity}</span>
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="grid grid-cols-5">
                          <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm leading-7 text-black">
                                Precio
                              </p>
                              <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                {item.product.price}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm leading-7 text-black">
                                Estado
                              </p>
                              <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                {order.status}
                              </p>
                            </div>
                          </div>
                          <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                            <div className="flex gap-3 lg:block">
                              <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                Fecha de entrega estimada
                              </p>
                              <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                15/09/2024
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))
        ) : (
          <div className="flex flex-col w-full items-center justify-center space-y-5">
            <p>Aún no tienes ninguna orden</p>
            <p className="text-3xl"><RiEmotionSadFill /></p>
          </div>
        )}
      </div>
    </section>
  );
}
