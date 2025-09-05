"use client";
// Importer / استيراد
import { createContext, useContext, useEffect, useState } from "react";

const Ctx = createContext(null);
export function useUser() {
  return useContext(Ctx);
}
// Komponent / المكوّن الرئيسي

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null); // Tilstand / حالة // {id, username, role, age}
  // Effekt / تأثير جانبي
  useEffect(() => {
    const m = document.cookie.match(/(?:^|; )ld_user=([^;]+)/);
    if (m) {
      try {
        const { user } = JSON.parse(decodeURIComponent(m[1]));
        setUser(user);
      } catch {}
    }
  }, []);
  const login = (user, remember = true) => {
    setUser(user);
    if (remember) {
      document.cookie = `ld_user=${encodeURIComponent(
        JSON.stringify({ user })
      )}; Max-Age=${60 * 60 * 24 * 30}; Path=/`;
    }
  };
  const logout = () => {
    setUser(null);
    document.cookie = "ld_user=; Max-Age=0; Path=/";
  };
  return (
    <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>
  );
}
