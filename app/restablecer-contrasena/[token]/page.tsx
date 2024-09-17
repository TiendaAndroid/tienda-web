"use client";
import { CircleUserRound, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Reset({ params }: { params: { token: string } }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(false);
  const [errorName, setErrorName] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/change/password/${params.token}`
        );
        const data = await response.json();

        if (!response.ok) {
          console.log(response.ok);
          setHasError(true);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setHasError(true);
      }
    };

    fetchProducts();
  }, [params.token]);

  async function handleSubmit() {
    if (password !== passwordConfirm) {
      setError(true);
    } else {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/change/password`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              newPassword: password,
              token: params.token,
            }),
          }
        );

        const data = await response.json();

        if (response.ok) {
          router.push("/restablecer-contrasena/success");
        }
        if (data.message == "newPassword is not strong enough") {
          setError(false);
          setErrorName("Coloca una contraseña más segura");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
  }

  if (hasError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="bg-white rounded-xl items-center flex flex-col space-y-3 w-1/3">
          <h1 className="text-2xl font-semibold">Pagina no encontrada</h1>
        </div>
      </main>
    );
  } else {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="bg-white rounded-xl items-center flex flex-col space-y-3 w-1/3">
          <h1 className="text-2xl font-semibold">Restablecer contraseña</h1>
          <p className="text-md">Hola, bienvenido de nuevo &#128075;</p>
          <form className="flex flex-col space-y-3 w-full">
            <div className="space-y-4 mt-4 w-full ">
              <div className="space-y-2">
                <label htmlFor="password" className="text-[15px]">
                  Contraseña Nueva
                </label>
                <div className=" flex flex-col relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="space-y-2">
                <label htmlFor="password" className="text-[15px]">
                  Confirma la contraseña
                </label>
                <div className=" flex flex-col relative">
                  <input
                    id="password"
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="••••••••"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    required
                    className="border border-gray-300 rounded-md py-2 px-4  focus:outline-none focus:border-primary"
                  />
                  <button
                    className="absolute right-0 top-0 h-full mr-4"
                    onClick={(e) => {
                      e.preventDefault();
                      setShowPasswordConfirm(!showPasswordConfirm);
                    }}
                  >
                    {showPasswordConfirm ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            {error && (
              <p className="text-red-600">Las contraseñas no coinciden</p>
            )}

            {errorName.length > 0 && (
              <p className="text-red-600">{errorName}</p>
            )}
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="w-full bg-primary p-3 rounded-md my-3 text-white hover:bg-pink-700 transition-colors duration-300"
            >
              Restablecer Contraseña
            </button>
          </form>
        </div>
      </main>
    );
  }
}
