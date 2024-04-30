import { RequestHandler } from "express";
import { getPaginator, validate } from "@/util/functions"
import { NewUserIn, EditUserIn, UserPaginatedQIn, EditUserScopeIn } from "@/util/validation/input.types";
import { ArrayResultOptions, SortOptions } from "@/util/types/types";
import { User } from "@aapc/types";
import { UserSortFields } from "@/services/repository/memory/sorters/user.sorter";
import { DB } from "@/services/services";
import { BadRequestError, NotFoundError } from "@/errors/HTTPErrors";

export default class UserController {
    static getUser: RequestHandler = async (req, res, next) => {
        const query = validate(UserPaginatedQIn, req.query)
        const options: ArrayResultOptions<SortOptions<User, UserSortFields>> = {
            startFrom: (query.p - 1) * query.pp,
            maxResults: query.pp,
            sort: [{ field: query.sortBy, descending: query.desc }]
        }
        const u = query.un === undefined
            ? await DB.getAllUsers(options)
            : await DB.searchUserByUsername(query.un, options)
        res.status(200).json(getPaginator(User, req, u, query.p, query.pp)).send()
        next()
    }

    static getUserByUsername: RequestHandler = async (req, res, next) => {
        const username: string = String(req.params.username)
        const u = await DB.getUserByUsername(username)
        if (u === null)
            throw new NotFoundError(`User with username ${username} does not exist.`)
        res.status(200).json(u).send()
        next()
    }

    static createUser: RequestHandler = async (req, res, next) => {
        const body = validate(NewUserIn, req.body)
        if (await DB.getUserByUsername(body.username) !== null)
            throw new NotFoundError(`User with username ${body.username} already exists.`)
        const u = body.toNewUser()
        await DB.createUser(u)
        res.location(`/user/${u.username}`)
        res.status(201).json(u).send()
        next()
    }

    static editUser: RequestHandler = async (req, res, next) => {
        const username: string = String(req.params.username)
        const currentUser = await DB.getUserByUsername(username)
        if (currentUser === null)
            throw new NotFoundError(`User with username ${username} does not exist.`)
        const body = validate(EditUserIn, req.body)
        const u = body.toExistingUser(currentUser)
        try {
            await DB.editUser(username, u)
        } catch (e) {
            if (e instanceof TypeError) throw new BadRequestError(e.message)
            throw e
        }
        res.status(200).json(u).send()
        next()
    }

    static editUserScope: RequestHandler = async (req, res, next) => {
        const username: string = String(req.params.username)
        const currentUser = await DB.getUserByUsername(username)
        if (currentUser === null)
            throw new NotFoundError(`User with username ${username} does not exist.`)
        const body = validate(EditUserScopeIn, req.body)
        const u = body.toExistingUser(currentUser)
        try {
            await DB.editUser(username, u)
        } catch (e) {
            if (e instanceof TypeError) throw new BadRequestError(e.message)
            throw e
        }
        res.status(200).json(u).send()
        next()
    }

    static deleteUser: RequestHandler = async (req, res, next) => {
        const username: string = String(req.params.id)
        if ((await DB.getUserByUsername(username)) === null)
            throw new NotFoundError(`User with username ${username} does not exist.`)
        await DB.deleteUser(username)
        res.status(204).send()
        next()
    }
}
