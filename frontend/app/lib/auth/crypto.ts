"use server"

import dotenv from "dotenv"
import jwt from "jsonwebtoken"
import { JWTPayload, Nullable } from "@/app/lib/types"

export async function verifyJwt(token: string): Promise<Nullable<JWTPayload>> {
    dotenv.config()
    const secret = process.env.JWT_SECRET || "local"
    let d: Nullable<JWTPayload> = null
    jwt.verify(token, secret, (error, decoded) => {
        if (!error) {
            d = <JWTPayload>decoded
        }
    })
    return d
}
