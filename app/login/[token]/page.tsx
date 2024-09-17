"use client";
import { Spinner } from "@nextui-org/spinner";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function VerProducto({ params }: { params: { token: string } }) {
  const router = useRouter();
  useEffect(() => {
    const checkToken = async () => {
      if (params.token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${params.token}`,
            },
          }
        );
        if (response.ok) {
          Cookies.set("token", params.token, { expires: 30 });
          router.push("/");
        }
      }
    };

    checkToken();
  },[router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-xl items-center flex flex-col space-y-3 w-1/3">
        <Spinner size="lg" />
      </div>
    </main>
  );
}
