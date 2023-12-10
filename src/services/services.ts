/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from "axios";

export const BASE_URL = window?.__RUNTIME_CONFIG__?.VITE_API_BASE_URL ?? "";

export const AppServices = {
  getProducts: async (
    searchKeyword?: string,
    sortOrder?: string,
    productCategoryId?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number
  ) => {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/product/paged-and-sorted-product-list?SearchKeyword=${searchKeyword}&SkipCount=${skipCount}&MaxResultCount=${maxResultCount}
      `
    );
    return response.data;
  },
  getProductCategoryList: async () => {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/product/product-category-list`
    );
    return response.data;
  },
  getProductById: async (productId: string) => {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/product/product-by-id/${productId}`
    );
    return response.data;
  },

  getAllProducts: async () => {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/product/paged-and-sorted-product-list?SkipCount=0&MaxResultCount=1000
      `
    );
    return response.data;
  },

  postProduct: async (payload: any) => {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/product/product`,
      payload
    );
    return response;
  },
  putProduct: async (id: string, payload: any) => {
    const response: AxiosResponse = await axios.put(
      `${BASE_URL}/product/${id}/product`,
      payload
    );
    return response;
  },

  getClients: async (
    searchKeyword?: string,
    sortOrder?: string,
    productId?: string,
    sorting?: string,
    skipCount?: number,
    maxResultCount?: number
  ) => {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/client-detail/paged-and-sorted-client-detail?SearchKeyword=${searchKeyword}&SkipCount=${skipCount}&MaxResultCount=${maxResultCount}
      `
    );
    return response.data;
  },

  getClientById: async (clientId: string) => {
    const response: AxiosResponse = await axios.get(
      `${BASE_URL}/client-detail/client-detail-by-id/${clientId}`
    );
    return response.data;
  },

  postClient: async (payload: any) => {
    const response: AxiosResponse = await axios.post(
      `${BASE_URL}/client-detail/client-detail`,
      payload
    );
    return response;
  },

  putClient: async (id: string, payload: any) => {
    const response: AxiosResponse = await axios.put(
      `${BASE_URL}/client-detail/client-detail/${id}`,
      payload
    );
    return response;
  },
};
