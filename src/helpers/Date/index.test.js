import { getMonth } from ".";

describe("Date helper", () => {
  describe("When getMonth is called", () => {
    it("returns janvier for 2022-01-01", () => {
      expect(getMonth(new Date("2022-01-01"))).toBe("janvier");
    });

    it("returns juillet for 2022-07-08", () => {
      expect(getMonth(new Date("2022-07-08"))).toBe("juillet");
    });
  });
});
