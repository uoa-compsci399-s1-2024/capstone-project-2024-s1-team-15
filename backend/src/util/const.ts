import { User } from "@aapc/types"

export const DEFAULT_PER_PAGE = 15
export const DEFAULT_ID_LENGTH = 8

export const DUMMY_USER = new User({
    username: "foobar",
    displayName: "John Doe",
    email: "john.doe@example.com",
    verified: true,
    registeredAt: new Date().toISOString(),
})
