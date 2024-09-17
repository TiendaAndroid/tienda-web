"use client";
import axios from "axios";
import {
  ShoppingCart,
  X,
  Check,
  CircleUserRound,
  Search,
  Users,
} from "lucide-react";
import { IoMenu } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import { UserData } from "@/interface/Users";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import GlobalContext from "@/context";
interface AdminData {
  id: number;
  name: string;
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  thirdColor: string;
  forthColor: string;
  fiveColor: string;
  primaryFontColor: string;
  secondaryFontColor: string;
}

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const token = Cookies.get("token");

  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  const totalCost = user?.cart.cart_items.reduce(
    (total, cart) => total + cart.product.price * cart.quantity,
    0
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Buscar:", searchQuery);
  };

  const onRemove = async (cartId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/item/${cartId}`,
        {
          method: "DELETE",
        }
      );

      console.log(response);

      if (response.status === 200) {
        console.log("Producto eliminado del carrito");
        // Aquí puedes actualizar el estado del carrito si es necesario
      } else {
        console.error("Error al eliminar el producto del carrito");
      }
    } catch (error) {
      console.error("Error al eliminar el producto del carrito", error);
    }
  };

  return (
    <header className="bg-white shadow-md w-full z-40">
      <div className="container mx-auto px-8 py-3 flex justify-between items-center">
        <div className="flex flex-row items-center text-2xl font-bold text-primary">
          Zazil
        </div>
        <nav className="hidden md:flex space-x-8 text-md items-center">
          <Link
            href={"/"}
            className="text-gray-600 hover:text-primary transition-colors duration-300"
          >
            Inicio
          </Link>
          <a
            href="#"
            className="text-gray-600 hover:text-primary transition-colors duration-300"
          >
            Productos
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary transition-colors duration-300"
          >
            Sobre Nosotros
          </a>
          <a
            href="#"
            className="text-gray-600 hover:text-primary transition-colors duration-300"
          >
            Contacto
          </a>
          <form onSubmit={handleSearchSubmit} className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md py-2 px-4 text-md pl-10 focus:outline-none focus:border-primary"
              placeholder="Buscar..."
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
          </form>
        </nav>
        <div className="flex items-center space-x-5">
          {user?.cart.cart_items?.length ?? 0 > 0 ? (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <div className="bg-primary rounded-full pointer-events-none text-white font-bold w-5 h-5 text-sm text-center absolute right-0">
                  {user?.cart.cart_items.length}
                </div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm   hover:bg-gray-50">
                  <ShoppingCart />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 md:w-80 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <p className="block px-4 py-2 text-sm font-bold text-gray-800">
                      Carrito de compras
                    </p>
                  </MenuItem>

                  {user?.cart.cart_items.map((cart, index) => (
                    <MenuItem key={index}>
                      <div className="flex  px-4 py-2 w-72 md:w-80">
                        <Image
                          src={cart.product.image[0]?.url}
                          alt={cart.product.name}
                          width={533}
                          height={800}
                          className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-md"
                        ></Image>
                        <div className="flex-grow flex flex-col pl-2 justify-between">
                          <div>
                            <div className="flex justify-between">
                              <p className="text-sm font-bold">
                                {cart.product.name}
                              </p>
                              <p className="text-sm  font-bold">
                                ${cart.product.price}
                              </p>
                            </div>
                            <p className="text-sm text-gray-500">Disponible</p>
                          </div>
                          <div className="flex justify-between">
                            <p className="text-sm text-gray-500">
                              Cantidad: {cart.quantity}
                            </p>
                            <button
                              onClick={(e) => onRemove(cart.id, e)}
                              className="p-0 text-sm hover:text-primary"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </MenuItem>
                  ))}

                  <MenuItem>
                    <div className="flex p-3 justify-between">
                      <p className="text-sm font-bold">Total</p>
                      <p className="text-sm font-bold">${totalCost}</p>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="flex p-3 justify-between">
                      <Link
                        href={"/carrito"}
                        type="submit"
                        className=" py-2 px-5 border-1 rounded-lg border-gray-300 hover:border-gray-500"
                      >
                        <p className="text-sm ">Ver carrito</p>
                      </Link>
                    </div>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          ) : (
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-700 shadow-sm   hover:bg-gray-50">
                  <ShoppingCart />
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 md:w-80 w-72 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
              >
                <div className="py-1">
                  <MenuItem>
                    <p className="block px-4 py-2 text-sm font-bold text-gray-800">
                      Carrito de compras
                    </p>
                  </MenuItem>
                  <MenuItem>
                    <div className="flex  px-4 py-2 w-72 md:w-80">
                      <p className="block px-4 py-2 text-sm font-bold justify-center items-center text-gray-800">
                        Aun no tienes artículos en el carrito
                      </p>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="flex p-3 justify-between">
                      <p className="text-sm font-bold">Total</p>
                      <p className="text-sm font-bold">$0.00</p>
                    </div>
                  </MenuItem>
                  <MenuItem>
                    <div className="flex p-3 justify-between">
                      <Link
                        href={"/carrito"}
                        type="submit"
                        className=" py-2 px-5 border-1 rounded-lg border-gray-300 hover:border-gray-500"
                      >
                        <p className="text-sm ">Ver carrito</p>
                      </Link>
                    </div>
                  </MenuItem>
                </div>
              </MenuItems>
            </Menu>
          )}

          <Link href={token ? "/usuario" : "/login"} className="mr-2">
            <CircleUserRound className="h-7 w-7 text-gray-600" />
          </Link>
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-7 w-7 text-gray-600" /> : <IoMenu />}
          </button>
        </div>
      </div>

      {/* Overlay y Menú Móvil */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10"
          onClick={toggleMenu}
        ></div>
      )}
      <div
        className={`md:hidden fixed top-0 right-0 h-full bg-white shadow-lg transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-20`}
        style={{ width: "70%" }}
      >
        <div className="flex flex-col items-center p-4">
          <Link
            href={"/"}
            className="block py-2 px-4 text-gray-600 hover:bg-pink-100 w-full text-center"
          >
            Inicio
          </Link>
          <a
            href="#"
            className="block py-2 px-4 text-gray-600 bg-pink-100 w-full text-center"
          >
            Productos
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-600 hover:bg-pink-100 w-full text-center"
          >
            Sobre Nosotros
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-gray-600 hover:bg-pink-100 w-full text-center"
          >
            Contacto
          </a>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
