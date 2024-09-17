"use client";
import React, { useContext, useEffect, useState } from "react";
import { User, MapPin, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { Spinner } from "@nextui-org/spinner";
import { UserData } from "@/interface/Users";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import Link from "next/link";
import GlobalContext from "@/context";

export default function VistaUsuario() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(false);

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  useEffect(() => {
    if (user != null) {
      setLoading(false);
    } else {
      router.push("/login");
      setLoading(false);
    }
  }, [user]);

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

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
    <div className="h-full min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="mb-8 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <User className="mr-2" /> Información del Usuario
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nombre">Nombre</Label>
                <Input
                  id="nombre"
                  value={user?.name + " " + user?.lastName}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={user?.email} readOnly />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className=" flex flex-row   ">
          <Link href={"/usuario/direcciones"} className="w-1/2 p-2">
            <Card className="mb-8 bg-white justify-center flex flex-col items-center ">
              <CardHeader>
                <CardTitle className="text-2xl font-bold  ">
                  Direcciones
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-7xl">
                  <FaMapLocationDot />
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href={"/usuario/ordenes"} className="w-1/2 p-2">
            <Card className="mb-8 bg-white justify-center flex flex-col items-center">
              <CardHeader>
                <CardTitle className="text-2xl font-bold  ">Ordenes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-7xl">
                  <FaBox />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <Button
          className="w-full bg-red-500 hover:bg-red-600"
          onClick={handleLogout}
        >
          Cerrar Sesión
        </Button>
      </div>
    </div>
  );
}
