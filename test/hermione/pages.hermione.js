const pages = {
  ["главная"]: "/",
  ["каталог"]: "/catalog",
  ["условия доставки"]: "/delivery",
  ["контакты"]: "/contacts",
};

describe("Страницы (e2e):", async function () {
  for (const key in pages) {
    it(`2-1 в магазине должна быть страница "${key}"`, async function () {
      await this.browser.url(`http://localhost:3000/hw/store${pages[key]}`);
      const div = this.browser.$("div");
      expect(await div.isExisting()).toBeTruthy();
    });
  }
});
