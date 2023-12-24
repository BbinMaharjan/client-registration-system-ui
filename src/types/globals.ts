export {};

declare global {
  interface Window {
    __RUNTIME_CONFIG__: {
      VITE_API_BASE_URL: string;
      VITE_NAME: string;
      VITE_EMAIL: string;
      VITE_PASSWORD: string;
    };
  }
}
