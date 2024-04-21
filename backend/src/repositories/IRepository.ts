import { Article, User } from "@aapc/types";
import { ArrayResult, ArrayResultOptions, Nullable, SortOptions } from "../util/types/util.types";
import { ArticleSortFields } from "./sorters/article.sorter";
import { UserSortFields } from "./sorters/user.sorter";
import { Sorter } from "./sorters/Sorter";

export default interface IRepository {
    getAllNews(options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>>

    getNewsById(id: string): Promise<Nullable<Article>>

    searchNewsByTitle(title: string, options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>>

    createNews(a: Article): Promise<Article>

    editNews(id: string, a: Article): Promise<Article>

    deleteNews(id: string): Promise<void>


    getAllResearch(options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>>

    getResearchById(id: string): Promise<Nullable<Article>>

    searchResearchByTitle(title: string, options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>>

    createResearch(a: Article): Promise<Article>

    editResearch(id: string, a: Article): Promise<Article>

    deleteResearch(id: string): Promise<void>


    getAllUsers(options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>>

    getUserByUsername(username: string): Promise<Nullable<User>>

    searchUserByUsername(username: string, options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>>

    createUser(u: User): Promise<User>

    editUser(username: string, u: User): Promise<User>

    deleteUser(username: string): Promise<void>
}

export class BaseRepository {
    handleArrayResultOptions<T, K extends SortOptions<T, any>>(
        arr: T[],
        options?: ArrayResultOptions<K>,
        sorter?: Sorter<T, K>
    ): T[] {
        let start, end
        if (options) {
            start = options.startFrom ?? 0
            end = options.maxResults ? options.maxResults + start : undefined
            if (sorter) {
                sorter(arr, options.sort)
            }
        }
        return arr.slice(start, end)
    }
}
