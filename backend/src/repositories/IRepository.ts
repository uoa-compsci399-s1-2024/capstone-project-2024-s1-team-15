import { Article, IArticle, IUser, User } from "@aapc/types";
import { Nullable } from "../util/types";

export default interface IRepository {
    getAllNews(): Promise<Article[]>
    getNewsById(id: number): Promise<Nullable<Article>>
    createNews(a: Article): Promise<Article>
    editNews(id: number, a: Article): Promise<Article>
    deleteNews(id: number): Promise<Article>

    getAllResearch(): Promise<Article[]>
    getResearchById(id: number): Promise<Nullable<Article>>
    createResearch(a: Article): Promise<Article>
    editResearch(id: number, a: Article): Promise<Article>
    deleteResearch(id:number): Promise<Article>

    getAllUsers(): Promise<User[]>
    getUserByUsername(username: string): Promise<Nullable<User>>
    createUser(u: User): Promise<User>
    editUser(u: User): Promise<User>
    deleteUser(u: User): Promise<User>
}
