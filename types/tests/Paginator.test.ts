import { test, expectTypeOf } from 'vitest'
import Paginator from "../src/Paginator";
import { Article } from "../main";

test("default constructor", () => {
    const p = new Paginator(Article)
    expectTypeOf(p).toEqualTypeOf<Paginator<Article>>()
})
