"use client";
import { CircleUserRound, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { use, useContext, useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import { ArrowLeft } from "lucide-react"; // Importa el icono de flecha
import GlobalContext from "@/context";

import { useRouter } from "next/navigation";

export default function Registrar() {
  const [showPassword, setShowPassword] = useState(false);
  const [isVerificationScreen, setIsVerificationScreen] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [textError, setTextError] = useState("");
  const router = useRouter();

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  useEffect(() => {
    if (user) {
      router.push("/zazil/tienda-web");
    }
  }, [user, router]);
  async function handleUpdate() {
    if (password.length == 0) {
      setError(true);
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/email`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              lastName,
              email,
              token: "12345",
              password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          setIsVerificationScreen(true);
        } else {
          setTextError(data.message);
          setError(true);
        }
      } catch (error) {
        setError(true);
      }
    }
  }

  function VerificationScreen({ onBack }: { onBack: () => void }) {
    const [token, setToken] = useState("");
    const [errorVerify, setErrorVerify] = useState(false);

    async function createUser() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name,
              lastName,
              email,
              token,
              password,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          console.log(data);
          localStorage.setItem("token", data.token);
          window.location.href = "/";
        } else {
          setErrorVerify(true);
          console.log(data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    return (
      <div className="bg-white rounded-xl items-center flex flex-col space-y-6 w-full md:w-1/3 md:p-0 p-5">
        <button className="self-start p-2" onClick={onBack}>
          <ArrowLeft className="h-6 w-6" />
        </button>
        <h1 className="text-2xl font-semibold">Verificación</h1>
        <p className="text-lg text-center">
          Introduce el código de verificación enviado a tu correo para
          registrarte
        </p>
        <input
          type="number"
          onChange={(e) => setToken(e.target.value)}
          value={token}
          placeholder="12345"
          required
          className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-primary"
        />
        {errorVerify && <p className="text-red-600">Código incorrecto</p>}
        <button
          onClick={(e) => {
            e.preventDefault();
            createUser();
          }}
          className="w-full bg-primary p-3 rounded-md text-white hover:bg-pink-700 transition-colors duration-300"
        >
          Verificar
        </button>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      {isVerificationScreen ? (
        <VerificationScreen onBack={() => setIsVerificationScreen(false)} />
      ) : (
        <div className="bg-white rounded-xl md:px-4 p-5 items-center flex flex-col space-y-3 w-full md:w-1/3">
          <h1 className="text-2xl font-semibold">Regístrate</h1>
          <p className="text-lg">Hola, crea tu cuenta de Zazil</p>
          <Link
            href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`}
            className="w-full bg-white border border-gray-300 p-3 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
          >
            <FcGoogle className="h-5 w-5" />
            <span>Regístrate con Google</span>
          </Link>
          <div className="flex items-center w-full">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-[15px]">
              o regístrate con correo
            </span>
            <hr className="flex-grow border-gray-300" />
          </div>
          <form className="flex flex-col space-y-3 w-full">
            <div className="space-y-4 w-full ">
              <div className="flex flex-col space-y-2 ">
                <label htmlFor="email">Nombre</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Nombre"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-primary"
                />
                {error && name.length == 0 && (
                  <p className="text-red-600">Poner un Nombre</p>
                )}
              </div>
              <div className="flex flex-col space-y-2 ">
                <label htmlFor="email">Apellido</label>
                <input
                  id="surname"
                  type="text"
                  placeholder="Apellido"
                  onChange={(e) => setLastName(e.target.value)}
                  value={lastName}
                  required
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-primary"
                />
                {error && lastName.length == 0 && (
                  <p className="text-red-600">Poner un Apellido</p>
                )}
              </div>
              <div className="flex flex-col space-y-2 ">
                <label htmlFor="email">Correo Electrónico</label>
                <input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                  className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-primary"
                />
                {error && email.length == 0 && (
                  <p className="text-red-600">Poner un correo valido</p>
                )}
              </div>
              <div className="space-y-2">
                <label htmlFor="password">Contraseña</label>
                <div className=" flex flex-col relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
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
                {error && password.length == 0 && (
                  <p className="text-red-600">Poner una contraseña</p>
                )}

                {textError == "password is not strong enough" && (
                  <p className="text-red-500">
                    La contraseña debe contener minúscula, mayúscula, números y
                    símbolos
                  </p>
                )}
              </div>
            </div>

            {error && textError == "El correo ya esta registrado" && (
              <p className="text-red-500">{textError}</p>
            )}
            <button
              className="w-full bg-primary p-3 rounded-md text-white hover:bg-pink-700 transition-colors duration-300"
              onClick={(e) => {
                e.preventDefault();
                handleUpdate();
              }}
            >
              Registrar
            </button>
          </form>
          <p>
            Si aun ya tienes cuenta{" "}
            <Link href="/login" className="hover:text-blue-800 text-blue-600">
              inicia sesión ↗
            </Link>{" "}
          </p>
        </div>
      )}
    </main>
  );
}
