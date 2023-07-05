import { CartApi } from "../../../../src/client/api";
import { CartState } from "../../../../src/common/types";

export class CartApiStub extends CartApi {
  private state: CartState = {};

  constructor(initialState?: CartState) {
    super();
    if (initialState) this.state = initialState;
  }

  getState() {
    return this.state;
  }

  setState(newState: CartState) {
    this.state = newState;
  }
}
