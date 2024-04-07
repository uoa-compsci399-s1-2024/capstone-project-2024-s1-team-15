import { User } from "@aapc/types";

export const DEFAULT_PER_PAGE = 15

export const DUMMY_USER = new User({
    username: "foobar",
    displayName: "John Doe",
    email: "john.doe@example.com",
    verified: true,
    registeredAt: new Date().toISOString()
})
