import { test, expectTypeOf, expect } from 'vitest'
import Article, { ArticleType } from "../src/Article";
import User from "../src/User";

test("default constructor", () => {
    const a = new Article()
    expectTypeOf(a).toEqualTypeOf<Article>()
})

test("overloaded constructor (full obj)", () => {
    const a = new Article({
        id: 192312,
        title: "A nice title",
        subtitle: "A nice subtitle",
        articleType: ArticleType.news,
        content: "Some nice content",
        publisher: new User(),
        publishedAt: new Date().toISOString(),
        lastEditedAt: new Date().toISOString(),
        media: []
    })
    expectTypeOf(a).toEqualTypeOf<Article>()
})

test("overloaded constructor (partial obj)", () => {
    const a = new Article({
        id: 192312,
        title: "A nice title"
    })
    expectTypeOf(a).toEqualTypeOf<Article>()
})

test("json stringify <=> json parse", () => {
    const a = new Article({
        id: 1234,
        title: "A cool title",
        subtitle: "A cool subtitle",
        articleType: ArticleType.research,
        content: "Some content",
        publisher: new User(),
        media: ["abcd", "abcde"]
    })
    const aJ = JSON.stringify(a)
    const aR = new Article(JSON.parse(aJ))
    expect(aJ).toEqual(JSON.stringify(aR))
})
