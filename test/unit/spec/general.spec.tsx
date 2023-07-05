import { within } from "@testing-library/react";
import { renderWithRouterAndStore } from "../utils/provider";
import { selectElementOrEmpty } from "../utils/htmlSelect";

describe("Общие требования:", () => {
  let rendered: ReturnType<typeof renderWithRouterAndStore>;

  beforeEach(() => {
    rendered = renderWithRouterAndStore("/");
  });

  it("1-2: в шапке отображаются ссылки на страницы магазина, а также ссылка на корзину", () => {
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

  it("1-3: название магазина в шапке должно быть ссылкой на главную страницу", () => {
    const link = rendered
      .getByRole("link", { name: "Example store" })
      .getAttribute("href");

    expect(link).toEqual("/");
  });
});
