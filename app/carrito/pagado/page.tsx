"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Confetti from "react-confetti";

const SuccessPage = () => {
  const router = useRouter();
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== "undefined") {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
      }
    };

    // Set initial dimensions on mount
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);

    // Clear the timeout when component unmounts
    const timer = setTimeout(() => {
      router.push("/usuario/ordenes");
    }, 5000);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, [router]);

  return (
    <div className="flex flex-col gap-6 items-center justify-center w-screen h-screen">
      {dimensions.width > 0 && dimensions.height > 0 && (
        <Confetti width={dimensions.width} height={dimensions.height} />
      )}
      <h1 className="text-6xl text-green-700">Pedido Pagado</h1>
      <h2 className="text-xl font-medium">
        Se enviará un correo del comprobante
      </h2>
      <h3>Se redirigirá a la tienda</h3>
    </div>
  );
};

export default SuccessPage;
