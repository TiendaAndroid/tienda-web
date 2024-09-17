"use client";
import { CircleUserRound, Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import Link from "next/link";
import NavBar from "@/components/NavBar";

export default function Reset() {

    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white">
        <div className="bg-white rounded-xl items-center flex flex-col space-y-3 w-1/3">
          <h1 className="text-2xl font-semibold">Contraseña cambiada con éxito</h1>
          <Link href="/login" className="text-blue-600 hover:text-blue-800">Regresar al login</Link>
        </div>
      </main>
    );
}
