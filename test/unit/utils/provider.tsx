import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { AnyAction, Store } from "redux";
import { LocationDescriptor } from "history";

export const renderWithRouterAndStore = (
  component: React.ReactElement,
  store: Store<any, AnyAction>,
  url: LocationDescriptor<unknown> = "/",
  initialIndex = 0
) => {
  const application = (
    <MemoryRouter initialEntries={[url]} initialIndex={initialIndex}>
      <Provider store={store}>{component}</Provider>
    </MemoryRouter>
  );

  return render(application);
};
