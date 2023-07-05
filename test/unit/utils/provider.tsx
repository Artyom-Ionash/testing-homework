import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { LocationDescriptor } from "history";
import { Application } from "../../../src/client/Application";
import { CartItem, ProductShortInfo } from "../../../src/common/types";
import { buildStore } from "./store";

export const renderWithRouterAndStore = (
  url: LocationDescriptor<unknown> = "/",
  order?: { id: number; item: CartItem }[]
) => {
  const store = buildStore(order);
  const application = (
    <MemoryRouter initialEntries={[url]} initialIndex={0}>
      <Provider store={store}>
        <Application />
      </Provider>
    </MemoryRouter>
  );

  return render(application);
};
