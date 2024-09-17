"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
     const router = useRouter();
  useEffect(() => {

    const timer = setTimeout(() => {
      router.push("/usuario/ordenes");
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [router]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center w-screen h-screen">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <h1 className="text-6xl text-green-700">Pedido Pagado</h1>
      <h2 className="text-xl font-medium">
        Se enviara un correo del comprobante
      </h2>
      <h3 className="">Se redirigirá a la tienda</h3>
    </div>
  );
};

export default SuccessPage;
