import { initStore } from "../../../src/client/store";
import { CartApiStub } from "./stubs/cartApiStub";
import { ExampleApiStub } from "./stubs/exampleApiStub";
import { CartItem, CartState } from "../../../src/common/types";

const basename = "/hw/store";

export const buildStore = (order?: { id: number; item: CartItem }[]) => {
  const exampleApi = new ExampleApiStub(basename);
  const cartApi = new CartApiStub();
  if (order) {
    const cart = order.reduce((acc, c) => {
      acc[c.id] = c.item;
      return acc;
    }, {} as CartState);
    cartApi.setState(cart);
  }

  return initStore(exampleApi, cartApi);
};
