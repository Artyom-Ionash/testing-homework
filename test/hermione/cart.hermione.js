describe("Корзина (e2e):", async function () {
  it("4-1: в шапке рядом со ссылкой на корзину должно отображаться количество не повторяющихся товаров в ней", async function () {
    await this.browser.url("http://localhost:3000/hw/store/catalog");
    const links = await this.browser.$$(".ProductItem-DetailsLink");
    const refs = await Promise.all(links.map((x) => x.getAttribute("href")));
    for (const ref of refs) {
      await this.browser.url(`http://localhost:3000${ref}`);
      const button = await this.browser.$(".ProductDetails-AddToCart");
      await button.click();
    }

    const text = await (
      await this.browser.$(".Application-Menu .nav-link:last-child")
    ).getText();
    const [value] = text.match(/\d+/) ?? [""];
    expect(value).toEqual("27");
  });
});
