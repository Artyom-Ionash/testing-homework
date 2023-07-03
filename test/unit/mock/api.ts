import axios, { AxiosResponse } from "axios";

import { ExampleApi } from "../../../src/client/api";
import {
  ProductShortInfo,
  Product,
  CheckoutFormData,
  CartState,
  CheckoutResponse,
} from "../../../src/common/types";

const okResponse = {
  status: 200,
  statusText: "OK",
  headers: {},
  config: {},
};

export const FAKE_PRODUCTS: Product[] = Array(30)
  .fill(null)
  .map((_, i) => ({
    id: i,
    name: `p-name-${i + 1}`,
    price: i,
    description: `p-d-${i + 1}`,
    material: `p-m-${i + 1}`,
    color: `p-c-${i + 1}`,
  }));

export class ExampleApiMock extends ExampleApi {
  constructor(basename: string) {
    super(basename);
  }

  async getProducts(): Promise<AxiosResponse<ProductShortInfo[]>> {
    return Promise.resolve({
      ...okResponse,
      data: FAKE_PRODUCTS,
    });
  }

  async getProductById(id: number): Promise<AxiosResponse<Product>> {
    return Promise.resolve({
      ...okResponse,
      data: FAKE_PRODUCTS.find((p) => p.id === id) || {
        id: -1,
        name: "NONE",
        price: -1,
        description: "NONE",
        material: "NONE",
        color: "NONE",
      },
    });
  }

  async checkout(
    form: CheckoutFormData,
    cart: CartState
  ): Promise<AxiosResponse<CheckoutResponse>> {
    return Promise.resolve({
      ...okResponse,
      data: { id: 123 },
    });
  }
}
