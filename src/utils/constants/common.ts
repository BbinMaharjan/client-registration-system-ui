// Global font size
export const DEFAULT_FONT_SIZE = 10;

// Pagination
export const PAGE_SIZE_OPTION = [10, 20, 50, 100];

export const LoginUser = {
  name: window?.__RUNTIME_CONFIG__?.VITE_NAME ?? "",
  email: window?.__RUNTIME_CONFIG__?.VITE_EMAIL ?? "",
  password: window?.__RUNTIME_CONFIG__?.VITE_PASSWORD ?? "",
};
