import { ArrayResult, ArrayResultOptions, Nullable, SortOptions } from "@/util/types/types"
import { Article, PollenData, User } from "@aapc/types"
import { ArticleSortFields } from "@/services/repository/memory/sorters/article.sorter"
import { UserSortFields } from "@/services/repository/memory/sorters/user.sorter"

export default interface IRepository {
    getAllNews(options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>>
    getNewsById(id: string): Promise<Nullable<Article>>
    searchNewsByTitle(
        title: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>>
    getAllNewsByUser(
        username: string,
        titleSearchInput?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>>
    createNews(a: Article): Promise<Article>
    editNews(id: string, a: Article): Promise<Article>
    deleteNews(id: string): Promise<void>
    getAllResearch(options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>): Promise<ArrayResult<Article>>
    getResearchById(id: string): Promise<Nullable<Article>>
    searchResearchByTitle(
        title: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>>
    createResearch(a: Article): Promise<Article>
    editResearch(id: string, a: Article): Promise<Article>
    deleteResearch(id: string): Promise<void>
    getAllResearchByUser(
        username: string,
        titleSearchInput?: string,
        options?: ArrayResultOptions<SortOptions<Article, ArticleSortFields>>
    ): Promise<ArrayResult<Article>>
    getAllUsers(options?: ArrayResultOptions<SortOptions<User, UserSortFields>>): Promise<ArrayResult<User>>
    getUserByUsername(username: string): Promise<Nullable<User>>
    searchUserByUsername(
        username: string,
        options?: ArrayResultOptions<SortOptions<User, UserSortFields>>
    ): Promise<ArrayResult<User>>
    createUser(u: User): Promise<User>
    editUser(username: string, u: User): Promise<User>
    deleteUser(username: string): Promise<void>
    getPollenDataset(): Promise<PollenData[]>
    deletePollenDataset(): Promise<any>
    createPollenDataset(pollenData: PollenData[]): Promise<any>
}
