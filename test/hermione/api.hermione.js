const axios = require("axios");

describe("API (e2e):", async function () {
  beforeEach(async function () {
    await this.browser.url("http://localhost:3000/hw/store");
  });

  it("дополнительно: api/products возвращает корректные данные", async function () {
    const { data } = await axios.get(
      "http://localhost:3000/hw/store/api/products"
    );
    for (const entry of data) {
      expect(entry).toHaveProperty("id");
      expect(entry).toHaveProperty("name");
      expect(entry).toHaveProperty("price");
    }
  });

  for (const id of [0, 1, 2]) {
    it(`дополнительно: api/products даёт выдачи с id ${id}`, async function () {
      const { data } = await axios.get(
        `http://localhost:3000/hw/store/api/products/${id}`
      );

      expect(data.id).toEqual(id);
    });
  }
});
