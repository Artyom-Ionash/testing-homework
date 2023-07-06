describe("Каталог (e2e):", async function () {
  beforeEach(async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/");
  });

  it("3-6: содержимое корзины должно сохраняться между перезагрузками страницы", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");

    const button = this.browser.$(".ProductDetails-AddToCart");
    await button.click();

    const l1 = this.browser.$(".navbar-nav .nav-link:last-child");
    const [value1] = (await l1.getText()).match(/\d+/) ?? [""];

    await this.browser.url("http://localhost:3000/hw/store/");

    const l2 = this.browser.$(".navbar-nav .nav-link:last-child");
    const [value2] = (await l2.getText()).match(/\d+/) ?? [""];

    expect(value1).toEqual(value2);
  });
});
