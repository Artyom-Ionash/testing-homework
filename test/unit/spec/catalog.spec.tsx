import React from "react";

import { Catalog } from "../../../src/client/pages/Catalog";
import { renderWithRouterAndStore } from "../utils/provider";
import { selectElementOrEmpty } from "../utils/html";
import { storeBuilder } from "../mock/store";
import { FAKE_PRODUCTS } from "../mock/api";

describe("Каталог:", () => {
  let rendered: ReturnType<typeof renderWithRouterAndStore>;

  beforeEach(() => {
    rendered = renderWithRouterAndStore(<Catalog />, storeBuilder());
  });

  it("в каталоге должны отображаться товары, список которых приходит с сервера", async () => {
    const pConditions = FAKE_PRODUCTS.map((product) => {
      let elements: HTMLElement[];
      try {
        elements = rendered.getAllByTestId(product.id);
      } catch {
        elements = [];
      }
      for (const element of elements) {
        if (element.classList.contains("ProductItem")) {
          const cardBody = selectElementOrEmpty(element, ".card-body");

          const price =
            selectElementOrEmpty(cardBody, ".ProductItem-Price").textContent ||
            "";
          const name = cardBody.querySelector(".ProductItem-Name")?.textContent;
          return [
            parseInt(price.substring(1)) === product.price,
            name === product.name,
          ].every((cond) => cond);
        }
      }
    });

    expect(pConditions.every((cond) => cond)).toBeTruthy();
    expect(pConditions.length).toEqual(FAKE_PRODUCTS.length);
  });
});
