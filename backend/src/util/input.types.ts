import { IArticle, IUser } from "@aapc/types";

export interface IArticleIn extends Omit<IArticle, "id" | "lastEditedAt" | "publishedAt" | "publisher"> {
}

export interface IUserIn extends Omit<IUser, "verified" | "registeredAt"> {
}
