import { consume, group } from "../../src/consumers";
import { fromIterable } from "../../src/producers";
import { sort, unfold } from "../../src/transformers";

describe("group, sort and unfold", () => {
  test("group is a consumer", async () => {
    const anArray = [1, 2, 3, 4];
    const source = fromIterable(anArray);

    const byOddsAndEvens = (x: number) => (x % 2 === 0 ? "even" : "odd");
    const groupByOddsAndEvens = group(byOddsAndEvens);

    // no need to call consume
    const results = await groupByOddsAndEvens(source);

    const expected = {
      even: [2, 4],
      odd: [1, 3],
    };
    expect(results).toEqual(expected);
  });

  test("sort needs an AsyncIterable<T[]>", async () => {
    const anArrayOfArrays = [
      [4, 2, 3, 1],
      [20, 26, 23, 21],
    ];
    const source = fromIterable(anArrayOfArrays);

    const sortNumbers = sort((a: number, b: number) => a - b);
    const result = await consume(sortNumbers(source));

    const expected = [
      [1, 2, 3, 4],
      [20, 21, 23, 26],
    ];
    expect(result).toEqual(expected);
  });

  test("unfolds an array", async () => {
    const anArrayOfArrays = [
      [1, 2, 3, 4],
      [20, 21, 23, 26],
    ];
    const source = fromIterable(anArrayOfArrays);

    const res = await consume(unfold(source));
    expect(res).toEqual([1, 2, 3, 4, 20, 21, 23, 26]);
  });
});
