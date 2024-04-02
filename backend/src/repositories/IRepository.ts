import { Article, User } from "@aapc/types";
import { ArrayResultOptions, Nullable } from "../util/helper.types";
import ArticleSorter, { ArticleSortFields } from "./memory/sorters/ArticleSorter";
import UserSorter, { UserSortFields } from "./memory/sorters/UserSorter";

export default interface IRepository {
    getAllNews(options?: ArrayResultOptions<ArticleSortFields>): Promise<Article[]>  // TODO: somehow return length

    getNewsById(id: number): Promise<Nullable<Article>>

    searchNewsByTitle(title: string, options?: ArrayResultOptions<ArticleSortFields>): Promise<Article[]>

    createNews(a: Article): Promise<Article>

    editNews(id: number, a: Article): Promise<Article>

    deleteNews(id: number): Promise<void>


    getAllResearch(options?: ArrayResultOptions<ArticleSortFields>): Promise<Article[]>

    getResearchById(id: number): Promise<Nullable<Article>>

    searchResearchByTitle(title: string, options?: ArrayResultOptions<ArticleSortFields>): Promise<Article[]>

    createResearch(a: Article): Promise<Article>

    editResearch(id: number, a: Article): Promise<Article>

    deleteResearch(id: number): Promise<void>


    getAllUsers(options?: ArrayResultOptions<UserSortFields>): Promise<User[]>

    getUserByUsername(username: string): Promise<Nullable<User>>

    searchUserByUsername(username: string, options?: ArrayResultOptions<UserSortFields>): Promise<User[]>

    createUser(u: User): Promise<User>

    editUser(username: string, u: User): Promise<User>

    deleteUser(username: string): Promise<void>
}
