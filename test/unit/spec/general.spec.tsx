import React from "react";

import { within } from "@testing-library/react";

import { Application } from "../../../src/client/Application";
import { renderWithRouterAndStore } from "../utils/provider";
import { selectElementOrEmpty } from "../utils/html";
import { storeBuilder } from "../mock/store";

describe("Общие требования:", () => {
  let rendered: ReturnType<typeof renderWithRouterAndStore>;

  beforeEach(() => {
    rendered = renderWithRouterAndStore(<Application />, storeBuilder());
  });

  it("в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
    const navigation = rendered.getByRole("navigation");
    const navbar = selectElementOrEmpty(navigation, ".navbar-nav");

    const links = within(navbar)
      .getAllByRole("link")
      .map((link) => link.getAttribute("href"));

    const expected = ["/catalog", "/delivery", "/contacts", "/cart"];
    expect(
      links.every((link) => typeof link === "string" && expected.includes(link))
    ).toBeTruthy();
  });

  it("название магазина в шапке должно быть ссылкой на главную страницу", () => {
    const link = rendered
      .getByRole("link", { name: "Example store" })
      .getAttribute("href");

    expect(link).toEqual("/");
  });
});
