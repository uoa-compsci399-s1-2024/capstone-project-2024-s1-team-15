import { test, expectTypeOf, expect } from 'vitest'
import User from "../src/User";

test("default constructor", () => {
    const u = new User()
    expectTypeOf(u).toEqualTypeOf<User>()
})

test("overloaded constructor (full obj)", () => {
    const u = new User({
        username: "coolusername",
        email: "coolman@mail.com",
        displayName: "Cool Man",
        verified: true,
        registeredAt: new Date().toISOString()
    })
    expectTypeOf(u).toEqualTypeOf<User>()
})

test("overloaded constructor (partial obj)", () => {
    const u = new User({
        username: "coolusername",
        email: "coolguy@mail.com"
    })
    expectTypeOf(u).toEqualTypeOf<User>()
})

test("json stringify <=> json parse", () => {
    const u = new User({
        username: "epicusername",
        email: "epicguy@mail.com",
        displayName: "Epic Guy",
        verified: false,
        registeredAt: new Date().toISOString()
    })
    const uJ = JSON.stringify(u)
    const uR = new User(JSON.parse(uJ))
    expect(uJ).toEqual(JSON.stringify(uR))
})
