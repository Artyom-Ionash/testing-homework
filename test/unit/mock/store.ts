import { CartApi } from "../../../src/client/api";
import { initStore } from "../../../src/client/store";
import { ExampleApiMock } from "./api";

const basename = "/hw/store";
const api = new ExampleApiMock(basename);
const cart = new CartApi();

export const storeBuilder = () => initStore(api, cart);
