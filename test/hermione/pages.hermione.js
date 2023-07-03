const { assert } = require("chai");

const HOME_PAGE = "http://localhost:3000/hw/store";

const pages = {
  ["главная"]: "/",
  ["каталог"]: "/catalog",
  ["условия доставки"]: "/delivery",
  ["контакты"]: "/contacts",
};

describe("Страницы:", async function () {
  beforeEach(async function ({ browser }) {
    await this.browser.url(HOME_PAGE);
  });

  for (const key in pages) {
    xit(`в магазине должна быть страница "${key}"`, async function () {
      await this.browser.url(`${HOME_PAGE}${pages[key]}`);
      const div = this.browser.$("div");
      expect(await div.isExisting()).toBeTruthy();
    });
  }
});
