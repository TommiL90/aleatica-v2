"use client";

import { ReactNode } from "react";
import { SWRConfig } from "swr";

function localStorageProvider() {
  // When initializing, we restore the data from `localStorage` into a map.
  let cachedData = localStorage.getItem('app-cache');
  const map = typeof window !== 'undefined' && cachedData !== null
    ? new Map(JSON.parse(cachedData))
    : new Map();
 
  // Before unloading the app, we write back all the data into `localStorage`.
  window.addEventListener('beforeunload', () => {
    const appCache = JSON.stringify(Array.from(map.entries()));
    localStorage.setItem('app-cache', appCache);
  });
 
  // We still use the map for write & read for performance.
  return map;
}



export default function Providers({ children }: { children: ReactNode }) {
  return (
    <SWRConfig
      value={{
        // refreshInterval: 3000,
        // revalidateIfStale: false,
        // revalidateOnFocus: false,
        // revalidateOnReconnect: false,
        provider: localStorageProvider,
      }}
   
    >
      {children}
    </SWRConfig>
  );
}