const HOME_PAGE = "http://localhost:3000/hw/store";

const pages = {
  ["главная"]: "/",
  ["каталог"]: "/catalog",
  ["условия доставки"]: "/delivery",
  ["контакты"]: "/contacts",
};

describe("Страницы (e2e):", async function () {
  beforeEach(async function ({ browser }) {
    await this.browser.url(HOME_PAGE);
  });

  for (const key in pages) {
    it(`2-1 в магазине должна быть страница "${key}"`, async function () {
      await this.browser.url(`${HOME_PAGE}${pages[key]}`);
      const div = this.browser.$("div");
      expect(await div.isExisting()).toBeTruthy();
    });
  }
});
