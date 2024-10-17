"use client";
import { CircleUserRound, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handleSubmit() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/email/reset`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      router.push("/login/restablecer/confirmado");
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white ">
      <div className="bg-white rounded-xl items-center flex flex-col space-y-3 w-full md:w-1/3 md:p-0 p-5">
        <h1 className="text-2xl font-semibold">Restablecer contraseña</h1>
        <form className="flex flex-col space-y-8 w-full">
          <div className="space-y-4 mt-4 w-full ">
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="email" className="text-[15px]">
                Escribe tu correo Electrónico
              </label>
              <input
                id="email"
                type="email"
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-primary"
              />
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full bg-primary p-3 rounded-md my-3 text-white hover:bg-pink-700 transition-colors duration-300"
          >
            Recuperar
          </button>
        </form>
        <p className="text-[15px]">
          Aún no estas registrado?{" "}
          <Link href="/registrar" className="hover:text-blue-800 text-blue-600">
            Crea tu cuenta ↗
          </Link>
        </p>
      </div>
    </main>
  );
}
