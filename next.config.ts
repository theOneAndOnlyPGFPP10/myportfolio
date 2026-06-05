import type { NextConfig } from 'next';

// Sprawdza, czy aplikacja działa w trybie deweloperskim
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    // Włączy się tylko na Twoim komputerze (localhost)
    dangerouslyAllowLocalIP: isDev, 
    
    remotePatterns: [
      // Konfiguracja dla środowiska lokalnego (Dev)
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
      },
      // Konfiguracja dla przyszłego środowiska produkcyjnego (Prod)
      // Odkomentuj i uzupełnij, gdy wrzucisz API na serwer:
      /*
      {
        protocol: 'https',
        hostname: 'api.twojadomena.pl',
      },
      */
    ],
  },
};

export default nextConfig;
