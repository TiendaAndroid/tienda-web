"use client";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import Cookies from "js-cookie";
import { UserData } from "@/interface/Users";

interface GlobalContextProps {
  user: UserData | null;
  setUser: React.Dispatch<React.SetStateAction<UserData | null>>;
}

const GlobalContext = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const checkToken = async () => {
      if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();

          setUser(data);
        }
      }
    };

    checkToken();
  });

  return (
    <GlobalContext.Provider value={{ user, setUser }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
