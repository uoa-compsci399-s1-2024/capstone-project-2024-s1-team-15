import { Article, User } from "aapc-types";
import { Nullable } from "../util/types";

export default interface IRepository {
    getAllNews(): Promise<Article[]>
    getNewsById(id: number): Promise<Nullable<Article>>

    getAllResearch(): Promise<Article[]>
    getResearchById(id: number): Promise<Nullable<Article>>

    getAllUsers(): Promise<User[]>
    getUserByUsername(username: string): Promise<Nullable<User>>
}
