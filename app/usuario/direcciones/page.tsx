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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import GlobalContext from "@/context";

export default function VistaUsuario() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [error, setError] = useState(false);

  const [nuevaDireccion, setNuevaDireccion] = useState({
    pais: "",
    municipio: "",
    estado: "",
    calle: "",
    noExterior: "",
    noInterior: "",
    colonia: "",
    cp: "",
    tipo: "",
  });

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  useEffect(() => {
    if (Cookies.get("token")) {
      setLoading(false);
    } else {
      router.push("/login");
      setLoading(false);
    }
  }, [user, router]);

  const handleUserSubmit = async () => {
    const token = Cookies.get("token");
    try {
      console.log("Datos enviados:", nuevaDireccion);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/directions`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...nuevaDireccion,
            pais: "México",
            cp: Number(nuevaDireccion.cp),
          }),
        }
      );

      console.log("Respuesta del servidor:", response);
      if (response.ok) {
        window.location.reload();
      } else {
        setError(true);
        const errorData = await response.json();
        console.log("Error en la solicitud:", errorData);
      }
    } catch (error) {
      console.log("Error en la solicitud:", error);
    }
  };

  const eliminarDireccion = async (id: string) => {
    const token = Cookies.get("token");
    try {
      console.log("Datos enviados:", nuevaDireccion);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/directions/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Respuesta del servidor:", response);
      if (response.ok) {
        window.location.reload();
      } else {
        const errorData = await response.json();
        console.log("Error en la solicitud:", errorData);
      }
      window.location.reload;
    } catch (error) {
      console.log("Error en la solicitud:", error);
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
    <div className="h-full min-h-screen  py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold flex items-center">
              <MapPin className="mr-2" /> Mis Direcciones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Array.isArray(user?.direction) &&
                user?.direction.map((dir) => (
                  <div
                    key={dir.id}
                    className="flex items-center justify-between bg-white p-4 rounded-lg shadow"
                  >
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
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => eliminarDireccion(dir.id)}
                      className="bg-red-500 text-white"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">
                Agregar Nueva Dirección
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="calle">Calle</Label>
                  <Input
                    id="calle"
                    value={nuevaDireccion.calle}
                    onChange={(e) =>
                      setNuevaDireccion({
                        ...nuevaDireccion,
                        calle: e.target.value,
                      })
                    }
                    placeholder="Ingrese la calle"
                  />
                  {error && nuevaDireccion.calle.length == 0 && (
                    <p className="text-sm text-red-600">Coloca una calle</p>
                  )}
                </div>
                <div className="flex flex-row w-full">
                  <div className=" w-1/2">
                    <Label htmlFor="calle">Numero exterior</Label>
                    <Input
                      id="noExterior"
                      value={nuevaDireccion.noExterior}
                      onChange={(e) =>
                        setNuevaDireccion({
                          ...nuevaDireccion,
                          noExterior: e.target.value,
                        })
                      }
                      placeholder="Ingrese el número exterior"
                    />
                    {error && nuevaDireccion.noExterior.length == 0 && (
                      <p className="text-sm text-red-600">
                        Coloca el número interior
                      </p>
                    )}
                  </div>

                  <div className=" w-1/2 pl-5">
                    <Label htmlFor="calle">Numero interior</Label>
                    <Input
                      id="noInterior"
                      value={nuevaDireccion.noInterior}
                      onChange={(e) =>
                        setNuevaDireccion({
                          ...nuevaDireccion,
                          noInterior: e.target.value,
                        })
                      }
                      placeholder="Ingrese el número interior"
                    />
                  </div>
                </div>
                <div className="z-10">
                  <Label htmlFor="ciudad">Estado</Label>
                  <Select
                    onValueChange={(value) =>
                      setNuevaDireccion({
                        ...nuevaDireccion,
                        tipo: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona el tipo de vivienda" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectLabel>Tipo de vivienda</SelectLabel>
                        <SelectItem value="casa">Casa</SelectItem>
                        <SelectItem value="departamento">
                          Departamento
                        </SelectItem>
                        <SelectItem value="negocio">Negocio</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {error && nuevaDireccion.tipo.length == 0 && (
                    <p className="text-sm text-red-600">
                      Coloca el tipo de vivienda
                    </p>
                  )}
                </div>
                <div className="z-10">
                  <Label htmlFor="ciudad">Estado</Label>
                  <Select
                    onValueChange={(value) =>
                      setNuevaDireccion({
                        ...nuevaDireccion,
                        estado: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecciona un estado" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                      <SelectGroup>
                        <SelectLabel>Estados de México</SelectLabel>
                        <SelectItem value="Aguascalientes">
                          Aguascalientes
                        </SelectItem>
                        <SelectItem value="Baja California">
                          Baja California
                        </SelectItem>
                        <SelectItem value="Baja California Sur">
                          Baja California Sur
                        </SelectItem>
                        <SelectItem value="Campeche">Campeche</SelectItem>
                        <SelectItem value="Chiapas">Chiapas</SelectItem>
                        <SelectItem value="Chihuahua">Chihuahua</SelectItem>
                        <SelectItem value="Ciudad de México">
                          Ciudad de México
                        </SelectItem>
                        <SelectItem value="Coahuila">Coahuila</SelectItem>
                        <SelectItem value="Colima">Colima</SelectItem>
                        <SelectItem value="Durango">Durango</SelectItem>
                        <SelectItem value="Guanajuato">Guanajuato</SelectItem>
                        <SelectItem value="Guerrero">Guerrero</SelectItem>
                        <SelectItem value="Hidalgo">Hidalgo</SelectItem>
                        <SelectItem value="Jalisco">Jalisco</SelectItem>
                        <SelectItem value="Estado de México">
                          Estado de México
                        </SelectItem>
                        <SelectItem value="Michoacan">Michoacán</SelectItem>
                        <SelectItem value="Morelos">Morelos</SelectItem>
                        <SelectItem value="Nayarit">Nayarit</SelectItem>
                        <SelectItem value="Nuevo Leon">Nuevo León</SelectItem>
                        <SelectItem value="Oaxaca">Oaxaca</SelectItem>
                        <SelectItem value="Puebla">Puebla</SelectItem>
                        <SelectItem value="Queretaro">Querétaro</SelectItem>
                        <SelectItem value="Quintana Roo">
                          Quintana Roo
                        </SelectItem>
                        <SelectItem value="San Luis Potosi">
                          San Luis Potosí
                        </SelectItem>
                        <SelectItem value="Sinaloa">Sinaloa</SelectItem>
                        <SelectItem value="Sonora">Sonora</SelectItem>
                        <SelectItem value="Tabasco">Tabasco</SelectItem>
                        <SelectItem value="Tamaulipas">Tamaulipas</SelectItem>
                        <SelectItem value="Tlaxcala">Tlaxcala</SelectItem>
                        <SelectItem value="Veracruz">Veracruz</SelectItem>
                        <SelectItem value="Yucatan">Yucatán</SelectItem>
                        <SelectItem value="Zacatecas">Zacatecas</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {error && nuevaDireccion.estado.length == 0 && (
                    <p className="text-sm text-red-600">Coloca el estado</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="ciudad">Municipio</Label>
                  <Input
                    id="municipio"
                    value={nuevaDireccion.municipio}
                    onChange={(e) =>
                      setNuevaDireccion({
                        ...nuevaDireccion,
                        municipio: e.target.value,
                      })
                    }
                    placeholder="Ingrese el municipio"
                  />
                  {error && nuevaDireccion.municipio.length == 0 && (
                    <p className="text-sm text-red-600">Coloca el municipio</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="ciudad">Colonia</Label>
                  <Input
                    id="colonia"
                    value={nuevaDireccion.colonia}
                    onChange={(e) =>
                      setNuevaDireccion({
                        ...nuevaDireccion,
                        colonia: e.target.value,
                      })
                    }
                    placeholder="Ingrese la colonia"
                  />
                  {error && nuevaDireccion.colonia.length == 0 && (
                    <p className="text-sm text-red-600">Coloca la colonia</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="codigoPostal">Código Postal</Label>
                  <Input
                    id="codigoPostal"
                    type="number"
                    value={nuevaDireccion.cp}
                    onChange={(e) =>
                      setNuevaDireccion({
                        ...nuevaDireccion,
                        cp: e.target.value,
                      })
                    }
                    placeholder="Ingrese el código postal"
                  />
                  {error && nuevaDireccion.cp.length == 0 && (
                    <p className="text-sm text-red-600">
                      Coloca el código postal
                    </p>
                  )}
                </div>
                <Button
                  onClick={handleUserSubmit}
                  className="w-full text-white"
                >
                  <Plus className="mr-2 h-4 w-4" /> Agregar Dirección
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
