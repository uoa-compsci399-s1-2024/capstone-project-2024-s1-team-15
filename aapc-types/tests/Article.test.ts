import { test, expectTypeOf, expect } from 'vitest'
import Article, { ArticleType } from "../src/Article";
import User from "../src/User";

test("default constructor", () => {
    const a = new Article()
    expectTypeOf(a).toEqualTypeOf<Article>()
})

test("overloaded constructor (full obj)", () => {
    const a = new Article({
        title: "A nice title",
        subtitle: "A nice subtitle",
        articleType: ArticleType.news,
        content: "Some nice content",
        publisher: new User(),
        publishedAt: new Date().toISOString(),
        lastEditedAt: new Date().toISOString()
    })
    expect(a.title).toBe("A nice title")
})
