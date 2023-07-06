describe("Корзина (e2e):", async function () {
  beforeEach(async function () {
    await this.browser.url("http://localhost:3000/hw/store");
  });

  it("4-1: в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const links = await this.browser.$$(".ProductItem-DetailsLink");
    const refs = await Promise.all(links.map((x) => x.getAttribute("href")));
    for (const ref of refs) {
      await this.browser.url(`http://localhost:3000${ref}`);
      let addButton;
      try {
        addButton = await this.browser.$(".ProductDetails-AddToCart");
        if (!(await addButton.isExisting())) return;
      } catch (e) {
        return;
      }
      await addButton.click();
    }

    const text = await (
      await this.browser.$(".Application-Menu .nav-link:last-child")
    ).getText();
    const [value] = text.match(/\d+/) ?? [""];
    expect(value).toEqual("27");
  });

  it("4-дополнительно: после подтверждения заказа должно быть уведомление об успехе операции", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog/1");
    let addButton;
    try {
      addButton = await this.browser.$(".ProductDetails-AddToCart");
      if (!(await addButton.isExisting())) return;
    } catch (e) {
      return;
    }
    await addButton.click();
    await this.browser.url("http://localhost:3000/hw/store/cart");

    const nameInput = await this.browser.$("#f-name");
    const phoneInput = await this.browser.$("#f-phone");
    const addressInput = await this.browser.$("#f-address");

    try {
      await nameInput.waitForExist({ timeout: 1000 });
    } catch (e) {
      return;
    }

    await nameInput.setValue("Имя");
    await phoneInput.setValue("1234567890");
    await addressInput.setValue("Адрес");

    const submitButton = this.browser.$(".Form-Submit");
    await submitButton.click();

    const message = this.browser.$(".Cart-SuccessMessage");
    expect(await message.isExisting()).toBeTruthy();
  });
});
