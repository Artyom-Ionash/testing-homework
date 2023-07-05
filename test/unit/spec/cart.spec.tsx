import { FAKE_PRODUCTS } from "../utils/stubs/exampleApiStub";
import { renderWithRouterAndStore } from "../utils/provider";
import { selectElementOrEmpty } from "../utils/htmlSelect";

const LIMIT = 3;
const COUNT = 5;
const initialCartState = FAKE_PRODUCTS.slice(0, LIMIT).map(
  ({ id, name, price }) => ({ id, item: { name, price, count: COUNT } })
);
const PRODUCTS_BY_NAME = initialCartState.reduce((acc, p) => {
  acc[p.item.name] = p;
  return acc;
}, {} as { [key: string]: (typeof initialCartState)[0] });

describe("Корзина:", () => {
  let rendered: ReturnType<typeof renderWithRouterAndStore>;

  beforeEach(() => {
    rendered = renderWithRouterAndStore("/cart", initialCartState);
  });

  it("4-1: в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async () => {
    const navigation = rendered.getByRole("navigation");
    const navbar = selectElementOrEmpty(
      navigation,
      ".navbar-nav .nav-link:last-child"
    );
    const [value] = navbar.textContent?.match(/\d+/) ?? [""];

    expect(parseInt(value)).toEqual(initialCartState.length);
  });

  it("4-2: в корзине должна отображаться таблица с добавленными в нее товарами", async () => {
    const pConditions = initialCartState.map((product) => {
      const row = rendered.getByTestId(product.id);
      const cells = row.querySelectorAll("td");
      const [name] = Array.from(cells).map((cell) => cell.textContent);
      return name === product.item.name;
    });

    expect(pConditions.length).toEqual(initialCartState.length);
    expect(pConditions.every((cond) => cond)).toBeTruthy();
  });

  it("4-3: для каждого товара должны отображаться название, цена, количество, стоимость, а также должна отображаться общая сумма заказа", async () => {
    const table = rendered.getByRole("table");
    const rows = Array.from(table.querySelectorAll("tbody > tr"));

    const pConditions = rows.map((row) => {
      const nameCell = row.querySelector(".Cart-Name");
      const priceCell = row.querySelector(".Cart-Price");
      const countCell = row.querySelector(".Cart-Count");
      const totalCell = row.querySelector(".Cart-Total");

      const name = nameCell?.textContent;
      if (!name || name !== PRODUCTS_BY_NAME[name].item.name) return false;

      const product = PRODUCTS_BY_NAME[name].item;

      const price = parseInt(priceCell?.textContent?.slice(1) ?? "");
      if (price !== product.price) return false;
      const count = parseInt(countCell?.textContent ?? "");
      if (count !== COUNT) return false;
      const total = parseInt(totalCell?.textContent?.slice(1) ?? "");
      if (total !== price * count) return false;

      return true;
    });

    const orderPriceCell = table.querySelector(".Cart-OrderPrice");
    const orderPrice = parseInt(orderPriceCell?.textContent?.slice(1) ?? "");
    const total = initialCartState.reduce(
      (acc, { item: { price } }) => acc + price * COUNT,
      0
    );

    expect(orderPrice).toEqual(total);
    expect(pConditions.length).toEqual(initialCartState.length);
    expect(pConditions.every((cond) => cond)).toBeTruthy();
  });
});
