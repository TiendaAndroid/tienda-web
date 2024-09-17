// Card.tsx
import GlobalContext from "@/context";
import { Product } from "@/interface/Products";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useContext } from "react";

interface CardProps {
  item: Product;
}

const Card: React.FC<CardProps> = ({ item }) => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("Home must be used within a GlobalProvider");
  }

  const { user } = context;

  async function handleSubmit() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cart/item`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
            product: item.id,
            cart: user?.cart.id,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data);
      } else {
        console.log(data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Link
      href={`/producto/${item.id}`}
      className=" rounded-lg overflow-hidden border-2 border-transparent hover:border-gray-300"
    >
      <Image
        src={item.image[0].url}
        alt={item.name}
        width={1280}
        height={1280}
        className="w-full h-60 object-contain"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {item.name}
        </h3>
        <p className="text-gray-600 mb-4">Toalla {item.material}</p>
        <p className="text-gray-800 text-2xl font-bold mb-4">${item.price}</p>
        <button
          onClick={handleSubmit}
          className="w-full bg-primary p-2 z-20 rounded-xl text-white hover:bg-pink-700 transition-colors duration-300"
        >
          Añadir al Carrito
        </button>
      </div>
    </Link>
  );
};

export default Card;
