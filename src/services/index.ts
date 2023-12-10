import { useQuery } from "react-query";
import { AppServices } from "./services";

export const useGetProduct = (
  searchKeyword: string,
  sortOrder: string,
  productCategoryId: string,
  sorting: string,
  skipCount: number,
  maxResultCount: number
) => {
  const responseData = useQuery(
    [
      "getProductData",
      searchKeyword,
      sortOrder,
      productCategoryId,
      sorting,
      skipCount,
      maxResultCount,
    ],
    async () => {
      return await AppServices.getProducts(
        searchKeyword,
        sortOrder,
        productCategoryId,
        sorting,
        skipCount,
        maxResultCount
      );
    }
  );

  return responseData;
};

export const useGetProductCategory = () => {
  const responseData = useQuery(["getProductCategory"], async () => {
    return await AppServices.getProductCategoryList();
  });
  return responseData;
};

export const useGetProductById = (productId: string) => {
  const responseData = useQuery(
    ["getProductById", productId],
    async () => {
      return await AppServices.getProductById(productId);
    },
    {
      enabled: !!productId,
      cacheTime: 0,
    }
  );
  return responseData;
};

export const useGetAllProduct = () => {
  const responseData = useQuery(["getAllProductData"], async () => {
    return await AppServices.getAllProducts();
  });
  return responseData;
};

export const useGetClient = (
  searchKeyword: string,
  sortOrder: string,
  productId: string,
  sorting: string,
  skipCount: number,
  maxResultCount: number
) => {
  const responseData = useQuery(
    [
      "getClientData",
      searchKeyword,
      sortOrder,
      productId,
      sorting,
      skipCount,
      maxResultCount,
    ],
    async () => {
      return await AppServices.getClients(
        searchKeyword,
        sortOrder,
        productId,
        sorting,
        skipCount,
        maxResultCount
      );
    }
  );

  return responseData;
};

export const useGetClientById = (clientId: string) => {
  const responseData = useQuery(
    ["getClientById", clientId],
    async () => {
      return await AppServices.getClientById(clientId);
    },
    {
      enabled: !!clientId,
      cacheTime: 0,
    }
  );
  return responseData;
};
