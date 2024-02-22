"use client"

import { ReactNode } from "react"
import { SWRConfig } from "swr"

// const localStorageProvider = () => {
//   const map = new Map(JSON.parse(localStorage.getItem("app-cache") || "[]"));

//   console.log(map);
//   window.addEventListener("beforeunload", () => {
//     const appCache = JSON.stringify(Array.from(map.entries()));
//     localStorage.setItem("app-cache", appCache);
//   });

//   return map;
// };

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={
        {
          // refreshInterval: 3000,
          // revalidateIfStale: false,
          // revalidateOnFocus: false,
          // revalidateOnReconnect: false,
          // provider: localStorageProvider,
        }
      }
    >
      {children}
    </SWRConfig>
  )
}
