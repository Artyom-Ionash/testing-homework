describe("Общие требования (e2e):", async function () {
  beforeEach(async function () {
    await this.browser.url("http://localhost:3000/hw/store");
  });

  it('1-4: на ширине меньше 576px навигационное меню должно скрываться за "гамбургер"', async function () {
    const menu = this.browser.$(".Application-Menu");

    await this.browser.setWindowSize(575, 1000);
    expect(await menu.isDisplayed()).toBeFalsy();
    await this.browser.setWindowSize(576, 1000);
    expect(await menu.isDisplayed()).toBeTruthy();
  });

  it('1-5: при выборе элемента из меню "гамбургера", меню должно закрываться', async function () {
    await this.browser.setWindowSize(575, 1000);
    const toggler = this.browser.$(".Application-Toggler");

    const navbar = this.browser.$(".Application-Menu .nav-link");
    expect(await navbar.isDisplayed()).toBeFalsy();
    await toggler.click();
    expect(await navbar.isDisplayed()).toBeTruthy();

    const links = this.browser.$$(".navbar-nav a");
    await links[0].click();
    expect(await navbar.isDisplayed()).toBeFalsy();
  });
});
