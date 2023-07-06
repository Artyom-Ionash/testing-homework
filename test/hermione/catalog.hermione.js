describe("Каталог (e2e):", async function () {
  it('3-5: если товар уже добавлен в корзину, повторное нажатие кнопки "добавить в корзину" должно увеличивать его количество', async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    const button = this.browser.$(".ProductDetails-AddToCart");
    await button.click();
    await this.browser.url("http://localhost:3000/hw/store/cart");
    const counter1 = await this.browser
      .$('tr[data-testid="0"] .Cart-Count')
      .getText();

    await this.browser.url("http://localhost:3000/hw/store/catalog/0");
    await button.click();
    await this.browser.url("http://localhost:3000/hw/store/cart");
    const counter2 = await this.browser
      .$('tr[data-testid="0"] .Cart-Count')
      .getText();

    const difference = parseInt(counter2) - parseInt(counter1);

    expect(difference).toEqual(1);
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
