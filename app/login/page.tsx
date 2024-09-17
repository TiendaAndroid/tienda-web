"use client";
import { CircleUserRound, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import GlobalContext from "@/context";

export default function Home() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  useEffect(() => {
    if (user) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, [user]);

  async function handleSubmit() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Cookies.set("token", data.token, { expires: 30 });
        window.location.href = "/";
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="bg-white rounded-xl items-center flex flex-col space-y-3 w-1/3">
          <Spinner size="lg" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="bg-white rounded-xl items-center flex flex-col space-y-3 w-1/3">
        <h1 className="text-2xl font-semibold">Iniciar sesión</h1>

        <p className="text-md">Hola, bienvenido de nuevo &#128075;</p>

        <Link
          href="http://localhost:3000/api/auth/google"
          className="w-full bg-white border border-gray-300 p-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
        >
          <FcGoogle className="h-5 w-5" />
          <span>Iniciar sesión con Google</span>
        </Link>

        <div className="flex items-center w-full my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-[15px]">
            o ingresa con correo
          </span>
          <hr className="flex-grow border-gray-300" />
        </div>
        <form className="flex flex-col space-y-3 w-full">
          <div className="space-y-4 mt-4 w-full ">
            <div className="flex flex-col space-y-2 ">
              <label htmlFor="email" className="text-[15px]">
                Correo Electrónico
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
            <div className="space-y-2">
              <label htmlFor="password" className="text-[15px]">
                Contraseña
              </label>
              <div className=" flex flex-col relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="border border-gray-300 rounded-md py-2 px-4  focus:outline-none focus:border-primary"
                />
                <button
                  className="absolute right-0 top-0 h-full mr-4"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPassword(!showPassword);
                  }}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {error && (
            <p className="text-red-500">Correo o contraseña incorrecto</p>
          )}

          <button
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full bg-primary p-3 rounded-md my-3 text-white hover:bg-pink-700 transition-colors duration-300"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="text-[15px]">
          Olvidaste tu contraseña?{" "}
          <Link
            href="/login/restablecer"
            className="hover:text-blue-800 text-blue-600"
          >
            Restablecer contraseña ↗
          </Link>
        </p>
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
